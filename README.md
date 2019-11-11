*Người dùng hệ thống: Nhân viên

*Chức năng cơ bản:
--------------------
- Quản lý danh sách hàng hóa
	+ Thêm/sửa/xóa/tìm kiếm hàng hóa
- Quản lý danh sách hóa đơn
	+ Thêm mới hóa đơn, thêm danh sách hàng và số lượng vào hóa đơn, tự cộng tổng giá trị đơn hàng, kiểm tra hàng trong kho còn đủ số lượng đáp ứng hay không, cập nhật số lượng còn lại trong kho sau khi tạo hóa đơn.
	+ Xóa/tìm kiếm hóa đơn

*Chức năng nâng cao:
--------------------
	+ Đăng nhập, đăng xuất
	+ Quản lý, tạo mới, thông tin người dùng, khóa người dùng, đổi mật khẩu
	+ Kết xuất chi tiết hóa đơn ở định dạng PDF
	+ Kết xuất thống kê theo số lượng hàng hóa bán được trong tháng (mã hàng - tên hàng - số lượng - số hóa đơn có mặt hàng này)

------------------------------------------------------
II. Yêu cầu kỹ thuật:
------------------------------------------------------
- Sử dụng spring framework: spring mvc, spring data jpa, spring security, spring boot
- Frontend: tùy chọn
- MySQL Database
- Các tìm kiếm, phân trang dữ liệu tại server side
- Có validate dữ liệu đầu vào, alert, notification đầy đủ
- Có khả năng sắp xếp danh sách hóa đơn theo ngày tạo, tổng giá, số lượng mặt hàng trong hóa đơn
- Sử dụng thư viện Jasper Report cho kết xuất file pdf khi tìm kiếm hóa đơn

------------------------------------------------------
* Run project:
- 2 account mặc định được add sẵn: 
    + Admin acc: admin@gmail.com | pass: 123456
    + Member acc: member@gmail.com | pass: 123456
- Phân quyền: 
- Member: Product Management, Order (Thêm hóa đơn), Bill Management (Xem thông tin, xóa hóa đơn)
- Admin: Statistical (thống kê số lượng bán được và xuất report pdf), User Management, và những những năng của Member

