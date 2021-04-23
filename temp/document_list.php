<script type="text/javascript">
    $('#doc-date-range').datepicker({format: "dd/mm/yyyy", language: "vi", todayBtn: true, autoclose: true});

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
                        <h1>Hệ thống văn bản</h1>
                    </div>
                    <div class="writing-content-left col-md-4">
                        <h3>Tìm kiếm</h3>
                        <form class="doc-form-search-act">
                            <div class="form-group">
                                <label>Số ký hiệu</label>
                                <input type="text" class="form-control" id="doc-no" placeholder="VD: 25/2020/QĐ-UBND">
                            </div>
                            <div class="form-group">
                                <label>Ngày ban hành</label>
                                <div class="input-daterange input-group" id="doc-date-range">
                                    <input type="text" class="input-sm form-control" id="doc-date-start" placeholder="15/09/2020" name="start" readonly />
                                    <input type="text" class="input-sm form-control" id="doc-date-end" placeholder="20/09/2020" name="end" readonly />
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Trích yếu</label>
                                <input type="text" class="form-control" id="doc-desc" placeholder="VD: Quy định về ...">
                            </div>
                            <input type="hidden" id="doc-type" value="<?php echo $_REQUEST['id']; ?>">
                            <input type="submit" id="doc-search" class="btn btn-primary" value="Tìm kiếm">
                        </form>
                    </div>
                    <div class="writing-content-right col-md-8">
                        <div class="row">
                            <div class="content-right-left col-md-6">
                                <h2>Danh sách</h2>
                                <span>8 kết quả</span>
                            </div>
                            <div class="content-right-right col-md-6">
                                <div class="form-group">
                                    <div class="input-group">
                                        <span class="input-group-addon">Danh mục</span>
                                        <select id="doc-cat" class="form-control" >
                                            <option>Tất cả</option>
                                            <option value="1" <?php echo (@$_REQUEST['docCat'] == 1) ? 'selected' : '' ?>>Danh mục 1</option>
                                            <option value="2" <?php echo (@$_REQUEST['docCat'] == 2) ? 'selected' : '' ?>>Danh mục 2</option>
                                            <option value="3" <?php echo (@$_REQUEST['docCat'] == 3) ? 'selected' : '' ?>>Danh mục 3</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="content-right-table col-md-12">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th scope="col">Số ký hiệu</th>
                                        <th scope="col" width="120px">Ngày ban hành</th>
                                        <th scope="col" class="intro">Trích yếu</th>
                                        <th scope="col" width="95px"></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td >25/2020/QĐ-UBND</td>
                                        <td>15/09/2020</td>
                                        <td>Ban hành Quy định về tổ chức đánh giá việc giải quyết thủ tục hành chính theo cơ chế một cửa, một cửa liên thông trên địa bàn </td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >1/2020/QĐ-UBND</td>
                                        <td>01/06/2020</td>
                                        <td>Quyết định ban hành Quy chế tổ chức và hoạt động của Phòng Văn Hóa và Thông tin thuộc UBND Quận 11</td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >2/2019/QÐ-UBND</td>
                                        <td>11/02/2019</td>
                                        <td>Ban hành Quy chế tổ chức và hoạt động của Phòng Giáo dục và Đào tạo thuộc Ủy ban nhân dân Quận </td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >1/2019/QÐ-UBND</td>
                                        <td>16/01/2019</td>
                                        <td>Ban hành Quy chế về tổ chức và hoạt động của Phòng Y tế thuộc Ủy ban nhân dân Quận 11</td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >02/2018/QĐ-UBND</td>
                                        <td>19/11/2018</td>
                                        <td>Quy chế tổ chức và hoạt động của Phòng Lao động - Thương binh và Xã hội thuộc Ủy ban nhân dân Quận 11</td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >25/2020/QĐ-UBND</td>
                                        <td>15/09/2020</td>
                                        <td>Ban hành Quy định về tổ chức đánh giá việc giải quyết thủ tục hành chính theo cơ chế một cửa, một cửa liên thông trên địa bàn </td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >1/2020/QĐ-UBND</td>
                                        <td>01/06/2020</td>
                                        <td>Quyết định ban hành Quy chế tổ chức và hoạt động của Phòng Văn Hóa và Thông tin thuộc UBND Quận 11</td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td >2/2019/QÐ-UBND</td>
                                        <td>11/02/2019</td>
                                        <td>Ban hành Quy chế tổ chức và hoạt động của Phòng Giáo dục và Đào tạo thuộc Ủy ban nhân dân Quận  </td>
                                        <td class="action">
                                            <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="document-detail" data-pi-id="1"><img class="table-icon-1" src="./assets/img/arrow_right_2.svg"></a>
                                            <a href="#"><img class="table-icon-2" src="./assets/img/icon_download.svg" alt="" /></a>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div class="electronic-information-pagination col-md-12">
                                <nav aria-label="Page navigation">
                                    <ul class="pagination pagination-doc">
                                        <li>
                                            <a class="previous" href="#" aria-label="Previous">
                                                <span aria-hidden="true"></span>
                                            </a>
                                        </li>
                                        <li><a href="#" data-pi-slide="page-item-slide-2" data-pi-type="document-list" data-pi-id="1" data-pi-page="1" class="<?php echo ($_REQUEST['page'] == 1 || !$_REQUEST['page']) ? 'active' : '' ?>">1</a></li>
                                        <li><a href="#" data-pi-slide="page-item-slide-2" data-pi-type="document-list" data-pi-id="1" data-pi-page="2" class="<?php echo ($_REQUEST['page'] == 2) ? 'active' : '' ?>">2</a></li>
                                        <li><a href="#" data-pi-slide="page-item-slide-2" data-pi-type="document-list" data-pi-id="1" data-pi-page="3" class="<?php echo ($_REQUEST['page'] == 3) ? 'active' : '' ?>">3</a></li>
                                        <li>
                                            <a  class="next" href="#" aria-label="Next">
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
