<script type="text/javascript">
    // mobile only
    if ($(window).width() <= 480) {
        $('.table').each(function () {
            var thead = [];
            $(this).find('thead th').each(function (idx, it) {
                thead.push({"text": $(it).html(), "class": $(it).attr("class")});
            });

            $(this).find('tbody tr').each(function (idx, itr) {
                var tr = $(itr);

                tr.find('td').each(function (idx, it) {
                    var t = $(it);
                    var c = '<span class="th-title '+ (thead[idx]).class +'">'+ (thead[idx]).text +'</span>'+ t.html();
                    t.html(c);
                });
            });
        });
    }
</script>

<!-- page writing -->
<div id="page-item-writing" class="writing">
        <div class="writing-content">
            <!-- Menu Top  -->
            <div class="container">
                <div class="page-breadcrumb-wrap">
                    <ol class="breadcrumb all-title-top">
                        <li class="bread-back"><a href="#" data-pi-slide="page-item-slide-1"></a></li>
                        <li class="home"><a href="#"><span>Trang chủ</span></a></li>
                        <li class="item"><a href="#"><span>Văn bản</span></a></li>
                    </ol>
                </div>
            </div>
            <!-- Content  -->
            <div class="container">
                <div class="writing-block-2 scroll-enable">
                    <div class="row">
                        <div class="text-title-block-2 col-md-12">
                            <h1>Thủ tục hành chính</h1>
                        </div>
                        <div class="writing-content-left col-md-4">
                            <h3>Tìm kiếm</h3>
                            <form class="service-country-form-search-act">
                                <div class="form-group">
                                    <label>Thủ tục/Công việc</label>
                                    <input type="text" id="service-job" class="form-control" placeholder="Nhập thủ tục, công việc"/>
                                </div>
                                <div class="form-group">
                                    <label>Lĩnh vực</label>
                                    <select id="service-domain" class="form-control">
                                        <option value="">Tất cả lĩnh vực</option>
                                        <option value="1">Lĩnh vực 1</option>
                                        <option value="2">Lĩnh vực 2</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>Đơn vị thực hiện</label>
                                    <select id="service-work" class="form-control">
                                        <option value="">Tất cả đơn vị</option>
                                        <option value="1">Đơn vị 1</option>
                                        <option value="2">Đơn vị 2</option>
                                    </select>
                                </div>
                                <input type="submit" class="btn btn-primary" value="Tìm kiếm"/>
                            </form>
                        </div>
                        <div class="writing-content-right col-md-8">
                            <div class="row">
                                <div class="content-right-left col-md-6">
                                    <h2>Danh sách</h2>
                                    <span>8 kết quả</span>
                                </div>
                                <div class="content-right-table col-md-12">
                                    <table class="table">
                                        <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Thủ tục</th>
                                            <th scope="col" width="100px">Lĩnh vực</th>
                                            <th scope="col" width="140px">Cơ quan thực hiện</th>
                                            <th scope="col"></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td >1</td>
                                            <td>Cấp bản sao từ sổ gốc</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >2</td>
                                            <td>Chứng thực chữ ký người dịch là cộng tác viên của Phòng Tư pháp</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >3</td>
                                            <td>Chứng thực chữ ký đối với người không phải là cộng tác viên dịch thuật của Phòng Tư pháp</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >4</td>
                                            <td>Cấp bản sao có chứng thực từ bản chính hợp đồng, giao dịch đã được chứng thực</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >5</td>
                                            <td>Đăng ký khai sinh có yếu tố nước ngoài	</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >6</td>
                                            <td>Chứng thực chữ ký người dịch là cộng tác viên của Phòng Tư pháp</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >7</td>
                                            <td>Chứng thực chữ ký người dịch là cộng tác viên của Phòng Tư pháp</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td >8</td>
                                            <td>Cấp bản sao từ sổ gốc</td>
                                            <td>Chứng thực </td>
                                            <td>Phòng tư pháp</td>
                                            <td class="action">
                                                <a href="#" data-pi-slide="page-item-slide-6" data-pi-type="service-detail" data-pi-id="2"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg" alt="" /></a>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="content-right-table-pages col-md-offset-8 col-md-4">
                                    <nav aria-label="Page navigation">
                                        <ul class="pagination pagination-service" data-pi-total-page="3">
                                            <li>
                                                <a class="previous" href="#" aria-label="Previous">
                                                    <span aria-hidden="true"></span>
                                                </a>
                                            </li>
                                            <li><a href="#" data-pi-slide="page-item-slide-5" data-pi-type="service-list" data-pi-id="2" data-pi-page="1" class="<?php echo ($_REQUEST['page'] == 1 || !$_REQUEST['page']) ? 'active' : '' ?>">1</a></li>
                                            <li><a href="#" data-pi-slide="page-item-slide-5" data-pi-type="service-list" data-pi-id="2" data-pi-page="2" class="<?php echo ($_REQUEST['page'] == 2) ? 'active' : '' ?>">2</a></li>
                                            <li><a href="#" data-pi-slide="page-item-slide-5" data-pi-type="service-list" data-pi-id="2" data-pi-page="3" class="<?php echo ($_REQUEST['page'] == 3) ? 'active' : '' ?>">3</a></li>
                                            <li>
                                                <a class="next" href="#" aria-label="Next">
                                                    <span aria-hidden="true"></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
</div>
<!-- content end -->
