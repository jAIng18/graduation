# Thiệp mời tốt nghiệp

Web tĩnh, không cần cài gì, chạy trên GitHub Pages.
Mở đầu là mũ tốt nghiệp tự vẽ rồi tan thành bụi (có nút Bỏ qua), sau đó là thiệp mời song ngữ VI/EN.
Giao diện sáng, tông xanh HCMUS: có đếm ngược, nút Thêm vào lịch / Chỉ đường, các thẻ Ngày · Giờ · Địa điểm.

## Làm thành thiệp của bạn

1. **`config.js`**: điền hết các chỗ còn `[trong ngoặc vuông]` (tên, ngày giờ, trường, chỗ hẹn, đường đi, Facebook).
   Thứ/ngày hiển thị và file lịch tự tính từ `EVENT_DATE`, `EVENT_START`, `EVENT_END` (giờ Việt Nam).
2. **Mấy dòng `<meta>` đầu `index.html`**: chữ và ảnh hiện khi share link lên Messenger/Zalo. Phải sửa tay.
3. **Ảnh** (giữ nguyên tên file):
   - `photo.jpg`: ảnh chân dung, tỉ lệ 4:5 (vd 800×1000)
   - `og.jpg`: ảnh preview khi share link, 1200×630
   - Bản đồ khuôn viên (tuỳ chọn): bỏ ảnh vào thư mục, ghi tên file vào `MAP_IMAGE`, chỉnh chỗ ghim bằng `PIN`.
     `campus-map.jpg` hiện có là bản đồ Bách Khoa của repo gốc, không dùng tới.
4. Màu (tuỳ chọn): các biến `--brand`, `--brand-deep`, `--brand-light`, `--brand-50`, `--brand-100` ở đầu `<style>`
   trong `index.html` và `make.html`. Font: dòng Google Fonts trong `<head>` (Be Vietnam Pro).

## Xem thử trên máy

```bash
python3 -m http.server 8000
```
Mở `http://localhost:8000/?to=Minh&g=family` (không mở file trực tiếp được, vì trang cần tải `guests.txt`).

## Đưa lên mạng

```bash
git remote add origin https://github.com/<user>/graduation.git
git push -u origin main
```
Trên GitHub: **Settings → Pages → Deploy from branch → `main` / `(root)`**.
Trang sẽ ở `https://<user>.github.io/graduation/`.

## Gửi link mời

- **Nhanh**: `https://<user>.github.io/graduation/?to=Minh&g=family`
  (`g` = `friend` mặc định, `family`, `teacher`, `work`, đúng như `GREETINGS` trong `config.js`. Thêm `&lang=en` để mở tiếng Anh.)
- **Lời nhắn riêng, link ngắn, mã hoá**: mở `https://<user>.github.io/graduation/make.html`
  (phải mở trên trang đã deploy, vì link tạo ra lấy theo địa chỉ trang):
  1. Tab **Nội dung**: sửa mẫu lời mời. Tab **Khách mời**: thêm tên.
  2. **Tạo guests.txt** → copy → **Mở guests.txt trên GitHub** → dán đè hết → Commit.
  3. Đợi khoảng 1 phút → **Kiểm tra tất cả link** → **Copy tất cả link** để gửi.
  4. Thỉnh thoảng bấm **Tải file sao lưu**. Danh sách chỉ lưu trong trình duyệt đó.

## Các file

| File | Vai trò |
|---|---|
| `config.js` | Toàn bộ thông tin và chữ trên thiệp |
| `index.html` | Trang thiệp |
| `make.html` | Trang tạo link mời riêng |
| `invite-crypto.js` | Mã hoá lời mời (AES-GCM). Mã bí mật chỉ nằm trong link, không nằm trong repo |
| `guests.txt` | Lời mời đã mã hoá, do `make.html` tạo |
