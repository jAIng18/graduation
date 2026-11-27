// =====================================================================
//  XÁC NHẬN THAM DỰ → GOOGLE SHEET
//  Dán toàn bộ file này vào Apps Script của một Google Sheet rồi triển khai thành Ứng dụng web.
//  Cách làm (khoảng 3 phút):
//   1. Mở https://sheets.new (Google Sheet mới), đặt tên tuỳ ý.
//   2. Menu Tiện ích mở rộng → Apps Script. Xoá code có sẵn, dán file này vào, bấm Lưu.
//   3. Bấm Triển khai → Tuỳ chọn triển khai mới → bánh răng → Ứng dụng web.
//      Thực thi với tư cách: Tôi.  Người có quyền truy cập: Bất kỳ ai.  → Triển khai → cấp quyền.
//   4. Copy "URL ứng dụng web" (đuôi /exec) và dán vào RSVP_URL trong config.js.
//  Sửa file này sau khi đã triển khai: Triển khai → Quản lý các lần triển khai → sửa → Phiên bản mới.
//
//  Sheet "Xác nhận": mỗi khách một dòng, câu trả lời mới nhất ghi đè câu cũ.
//  Sheet "Lượt mở":  mỗi lần ai đó mở thiệp thêm một dòng (biết ai đã xem link).
// =====================================================================

const RSVP_SHEET = "Xác nhận";
const RSVP_HEAD = ["Cập nhật lúc", "Mã link", "Tên", "Trả lời", "Lời nhắn", "Số lần trả lời"];
const OPEN_SHEET = "Lượt mở";
const OPEN_HEAD = ["Lúc", "Mã link", "Tên", "Thiết bị"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // two guests at the same second must not overwrite each other's row
  try {
    const d = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    const book = SpreadsheetApp.getActiveSpreadsheet();
    const code = clean(d.code, 40), name = clean(d.name, 60);
    if (!code && !name) return reply({ ok: false, error: "no guest" });

    if (d.type === "open") {
      sheet(book, OPEN_SHEET, OPEN_HEAD).appendRow([new Date(), code, name, clean(d.ua, 160)]);
      return reply({ ok: true });
    }

    const answer = d.answer === "yes" ? "Sẽ đến" : d.answer === "no" ? "Không đến" : "";
    if (!answer) return reply({ ok: false, error: "bad answer" });
    const sh = sheet(book, RSVP_SHEET, RSVP_HEAD);
    const rows = sh.getDataRange().getValues();
    // the same guest = same link code; links without a code (?to=Name) are matched by name
    let at = -1;
    for (let i = 1; i < rows.length; i++) {
      if (code ? rows[i][1] === code : !rows[i][1] && rows[i][2] === name) { at = i; break; }
    }
    const times = at > 0 ? Number(rows[at][5] || 0) + 1 : 1;
    const row = [new Date(), code, name, answer, clean(d.note, 500), times];
    if (at > 0) sh.getRange(at + 1, 1, 1, row.length).setValues([row]);
    else sh.appendRow(row);
    return reply({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return reply({ ok: true, hint: "RSVP endpoint is running" });
}

function sheet(book, title, head) {
  let sh = book.getSheetByName(title);
  if (!sh) {
    sh = book.insertSheet(title);
    sh.appendRow(head);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, head.length).setFontWeight("bold");
  }
  return sh;
}

// Text from the page: cut to length, and never start with = + - @ so the sheet cannot run it as a formula.
function clean(v, max) {
  const s = String(v == null ? "" : v).trim().slice(0, max);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
