// =====================================================================
//  THÔNG TIN THIỆP MỜI: sửa file này là đủ.
//  Chỗ nào còn [trong ngoặc vuông] là chưa điền.
//  Ngoài file này chỉ còn: ảnh (photo.jpg, og.jpg, bản đồ nếu có)
//  và mấy dòng <meta> ở đầu index.html (ảnh/chữ hiện khi share link).
//  Màu sắc: các biến --brand… ở đầu <style> trong index.html và make.html.
//  Dùng chung cho index.html (thiệp) và make.html (tạo link).
// =====================================================================

// ----- Bạn là ai -----
const ME = "Giang";                    // tên ngắn, dùng trong lời mời
const FULL_NAME = "Trần Trường Giang";
const FB = "https://www.facebook.com/tran.giang.999946/"; // để "" thì ẩn nút Facebook
const ZALO = "0822713158";             // số điện thoại Zalo, để "" thì ẩn nút Zalo. Không có cả 2 thì ẩn mục Liên hệ
const SCHOOL_SHORT = "HCMUS";          // hiện ở thanh trên cùng

// ----- Khi nào (giờ Việt Nam) -----
// Thứ, ngày hiển thị, đếm ngược và file lịch (Google Calendar, .ics) đều tự tính từ 3 dòng này.
const EVENT_DATE = "2026-12-06";       // năm-tháng-ngày
const EVENT_START = "16:00";
const EVENT_END = "17:30";

// ----- Ở đâu -----
// HCMUS có 2 cơ sở: 227 Nguyễn Văn Cừ, Phường 4, Quận 5 và Khu đô thị ĐHQG, Linh Trung, Thủ Đức.
const MAPS_QUERY = "Trường Đại học Khoa học Tự nhiên, 227 Nguyễn Văn Cừ, TP.HCM"; // gõ vào Google Maps ra đúng chỗ
const CALENDAR_PLACE = "Trường ĐH Khoa học Tự nhiên, 227 Nguyễn Văn Cừ, TP.HCM";
// Bản đồ khuôn viên (tuỳ chọn): bỏ ảnh vào thư mục rồi ghi tên file, vd "campus-map.jpg". Để "" thì ẩn.
const MAP_IMAGE = "campus-map.jpg";
// Chỗ hẹn trên bản đồ: một vòng sáng quanh điểm đó, nhãn (TEXT.pin) hiện phía trên vòng.
// left/top = tâm vòng, tính theo % chiều ngang/dọc của ảnh. size = đường kính, theo % chiều ngang ảnh.
const PIN = { left: "61.4%", top: "53.3%", size: "11%" }; // cột cờ, giữa dãy B và dãy A

// ----- Xác nhận tham dự -----
// URL Ứng dụng web của Google Apps Script (đuôi /exec), cách lấy xem đầu file rsvp-apps-script.gs.
// Câu trả lời và lượt mở thiệp được ghi vào Google Sheet đó. Để "" thì ẩn mục xác nhận.
const RSVP_URL = "https://script.google.com/macros/s/AKfycbzn__0B3GZfvJcIs8xCI0LzYpsGNVToXzdbYIFWBFG-lKQpo0T-777JBtoZlNbEB6nb/exec";

// ----- Lời mời mặc định theo nhóm khách -----
// Link ?to=Minh&g=family dùng nhóm "family". make.html lấy các nhóm này làm mẫu ban đầu.
// {n} = tên khách. Tiếng Việt đổi xưng hô theo quan hệ nên mỗi nhóm một lời riêng.
const GREETINGS = {
  friend: {
    label: "Bạn bè",
    vi: { dear: "Gửi {n},", msg: `Sau 4 năm, ${ME} cuối cùng cũng tốt nghiệp rồi! Tới chụp vài tấm hình và chung vui với mình nha.` },
    en: { dear: "Hi {n},", msg: "After four years, I'm finally graduating! Come take some photos and celebrate with me." },
  },
  family: {
    label: "Gia đình",
    vi: { dear: "Kính gửi {n},", msg: `${ME} trân trọng kính mời {n} đến chung vui ngày tốt nghiệp. Có mọi người ở đó là món quà lớn nhất với ${ME}.` },
    en: { dear: "Dear {n},", msg: "I would be so happy to have you at my graduation. Having you there means the world to me." },
  },
  teacher: {
    label: "Thầy cô",
    vi: { dear: "Kính gửi {n},", msg: "Em xin trân trọng kính mời {n} đến dự buổi chụp hình tốt nghiệp của em. Cảm ơn {n} đã dạy dỗ em suốt những năm qua." },
    en: { dear: "Dear {n},", msg: "It would be an honor to have you at my graduation. Thank you for teaching me all these years." },
  },
  work: {
    label: "Đồng nghiệp",
    vi: { dear: "Gửi {n},", msg: `${ME} trân trọng mời {n} ghé chung vui ngày tốt nghiệp của ${ME}. Rất mong được gặp {n} ở đó!` },
    en: { dear: "Hi {n},", msg: "I'd love for you to join my graduation. Hope to see you there!" },
  },
};

// ----- Chữ trên thiệp (Tiếng Việt / English) -----
// Ngày và giờ không cần ghi ở đây: tự lấy từ EVENT_DATE / EVENT_START / EVENT_END.
const TEXT = {
  vi: {
    showPre: "Thư mời dự", showTitle: "Lễ Tốt Nghiệp",
    faculty: "Khoa Công nghệ Thông tin",
    school: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    eyebrow: "Thư mời dự lễ tốt nghiệp",
    title: `Chung vui <em>ngày tốt nghiệp</em> cùng ${ME}`,
    fallback: "bạn",
    timeNote: "",                      // ghi chú nhỏ dưới giờ, vd: "Lễ của khoa bắt đầu 14:30, tới 15:30 là vừa đẹp"
    place: "Cột cờ<small>Cơ sở Nguyễn Văn Cừ · 227 Nguyễn Văn Cừ, TP.HCM</small>", // vd chỗ hẹn: "Trước sảnh nhà I"
    routeL: "Đường đến cột cờ",
    pin: "Cột cờ · chỗ hẹn",          // nhãn trên bản đồ
    gates: [                           // [tên cổng, đường]. Để [] nếu không cần mục này
      ["Cổng chính", "Đường Nguyễn Văn Cừ, đi bộ vào"],
      ["Cổng xe máy", "Đường Nguyễn Văn Cừ, bên phải cổng chính"],
    ],
    tip: "Vào cổng chính trên đường Nguyễn Văn Cừ, đi thẳng vào sân, cột cờ nằm cuối sân, giữa dãy B và dãy A.",
    sign: `Hẹn gặp bạn nhé! — ${FULL_NAME}`,
  },
  en: {
    showPre: "You're invited to my", showTitle: "Graduation",
    faculty: "Faculty of Information Technology",
    school: "University of Science, VNU-HCM",
    eyebrow: "Graduation invitation",
    title: `Celebrate <em>graduation day</em> with ${ME}`,
    fallback: "friend",
    timeNote: "",
    place: "The flagpole<small>Nguyen Van Cu campus · 227 Nguyen Van Cu St, HCMC</small>",
    routeL: "Getting there",
    pin: "Flagpole · meet here",
    gates: [
      ["Main gate", "Nguyen Van Cu St, walk in"],
      ["Motorbike gate", "Nguyen Van Cu St, right of the main gate"],
    ],
    tip: "Enter through the main gate on Nguyen Van Cu St and walk straight into the yard. The flagpole is at the far end, between buildings B and A.",
    sign: `See you there! — ${FULL_NAME}`,
  },
};
