// =====================================================================
//  THÔNG TIN THIỆP MỜI: sửa file này là đủ.
//  Chỗ nào còn [trong ngoặc vuông] là chưa điền.
//  Ngoài file này chỉ còn: ảnh (photo.jpg, og.jpg, bản đồ nếu có)
//  và mấy dòng <meta> ở đầu index.html (ảnh/chữ hiện khi share link).
//  Màu sắc: các biến --brand… ở đầu <style> trong index.html và make.html.
//  Dùng chung cho index.html (thiệp) và make.html (tạo link).
// =====================================================================

// ----- Bạn là ai -----
const ME = "[Tên]";                    // tên ngắn, dùng trong lời mời. Vd: "Trí"
const FULL_NAME = "[Họ và tên]";
const FB = "https://www.facebook.com/[ten-facebook]"; // để "" thì ẩn mục Liên hệ
const SCHOOL_SHORT = "HCMUS";          // hiện ở thanh trên cùng

// ----- Khi nào (giờ Việt Nam) -----
// Thứ, ngày hiển thị, đếm ngược và file lịch (Google Calendar, .ics) đều tự tính từ 3 dòng này.
const EVENT_DATE = "2026-11-28";       // [đổi] năm-tháng-ngày
const EVENT_START = "15:30";           // [đổi]
const EVENT_END = "17:00";             // [đổi]

// ----- Ở đâu -----
// HCMUS có 2 cơ sở: 227 Nguyễn Văn Cừ, Phường 4, Quận 5 và Khu đô thị ĐHQG, Linh Trung, Thủ Đức.
const MAPS_QUERY = "[Trường Đại học Khoa học Tự nhiên 227 Nguyễn Văn Cừ]"; // gõ vào Google Maps ra đúng chỗ
const CALENDAR_PLACE = "[Trường ĐH Khoa học Tự nhiên, 227 Nguyễn Văn Cừ, Quận 5]";
// Bản đồ khuôn viên (tuỳ chọn): bỏ ảnh vào thư mục rồi ghi tên file, vd "campus-map.jpg". Để "" thì ẩn.
const MAP_IMAGE = "";
// Ghim trên bản đồ: left/top = vị trí tính theo % chiều ngang/dọc của ảnh.
const PIN = { label: "[Chỗ hẹn]", left: "50%", top: "50%" };

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
    faculty: "[Khoa]",                 // vd: "Khoa Công nghệ Thông tin"
    school: "Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM",
    eyebrow: "Thư mời dự lễ tốt nghiệp",
    title: `Chung vui <em>ngày tốt nghiệp</em> cùng ${ME}`,
    fallback: "bạn",
    timeNote: "[Ghi chú giờ, để \"\" nếu không cần]", // vd: "Lễ của khoa bắt đầu 14:30, tới 15:30 là vừa đẹp"
    place: "[Chỗ hẹn]<small>[Cơ sở · địa chỉ]</small>", // vd: "Trước sảnh nhà I<small>Cơ sở Nguyễn Văn Cừ · 227 Nguyễn Văn Cừ, Q.5</small>"
    routeL: "Đường đến [chỗ hẹn]",
    gates: [                           // [tên cổng, đường]. Để [] nếu không cần mục này
      ["[Cổng chính]", "[Tên đường]"],
      ["[Cổng phụ]", "[Tên đường]"],
    ],
    tip: "[Vào cổng nào, rồi đi tiếp thế nào để tới chỗ hẹn]",
    sign: `Hẹn gặp bạn nhé! — ${FULL_NAME}`,
  },
  en: {
    showPre: "You're invited to my", showTitle: "Graduation",
    faculty: "[Faculty]",              // vd: "Faculty of Information Technology"
    school: "University of Science, VNU-HCM",
    eyebrow: "Graduation invitation",
    title: `Celebrate <em>graduation day</em> with ${ME}`,
    fallback: "friend",
    timeNote: "[Time note, or \"\"]",
    place: "[Meeting point]<small>[Campus · address]</small>",
    routeL: "Getting there",
    gates: [
      ["[Main gate]", "[Street]"],
      ["[Side gate]", "[Street]"],
    ],
    tip: "[Which gate, and how to walk to the meeting point]",
    sign: `See you there! — ${FULL_NAME}`,
  },
};
