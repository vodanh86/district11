<script type="text/javascript">
    (function($) {
        $('body').on('click', '.btn-icon-print', function () {
            $('.content-reading').printThis({
                importCSS: true
            });
            return false;
        });

        var minSize = 12;
        var maxSize = 30;
        var size = 14;
        $('body').on('click', '.btn-icon-size', function () {
            size += 1;
            if (size > 30) {
                size = 12;
            }

            $('.content-reading p').css('font-size', size +'px');
        });

        $('.input-color-picker').wheelColorPicker().on('colorchange', function() {
            var color = $('.input-color-picker').val();
            $('.content-reading, .content-reading p, .content-reading h2, .content-reading h3, .content-reading h4, .content-reading h5').css('color', color);
        });

        var content = $('.content-reading').text();

        var checkInit = false;
        $('body').on('click', '.btn-icon-play', function () {
            if (!checkInit) {
                responsiveVoice.speak(content, 'Vietnamese Female');
                checkInit = true;
            }

            if(responsiveVoice.isPlaying()) {
                responsiveVoice.pause();
            } else {
                responsiveVoice.resume();
            }

            return false;
        });
    })(jQuery);
</script>

<!--  page reflect -->
<div id="page-item-reflect" >
        <div class="content-reflect">
            <!-- Menu Top  -->
            <div class="container">
                <div class="page-breadcrumb-wrap">
                    <?php if ($_REQUEST['type'] == 'news-detail-direct') { ?>
                    <!-- param type = news-detail-direct -->
                    <ol class="breadcrumb all-title-top">
                        <li class="bread-back"><a href="#" data-pi-slide="page-item-slide-1"></a></li>
                        <li class="home"><a href="#"><span>Trang chủ</span></a></li>
                        <li class="item"><a href="#"><span>Thông tin điện tử</span></a></li>
                        <li class="item"><a href="#"><span>Tin tức - sự kiện</span></a></li>
                    </ol>
                    <?php } else { ?>
                    <!-- param type = news-detail hoặc news-detail-search -->
                    <ol class="breadcrumb all-title-top">
                        <li class="bread-back"><a href="#" data-pi-slide="page-item-slide-2"></a></li>
                        <li class="home"><a href="#"><span>Trang chủ</span></a></li>
                        <li class="item"><a href="#"><span>Thông tin điện tử</span></a></li>
                        <li class="item"><a href="#"><span>Tin tức - sự kiện</span></a></li>
                    </ol>
                    <?php } ?>
                </div>
            </div>
            <!-- Content  -->
            <div class="container">
                <div class="news-events-block scroll-enable">
                    <div class="news-events-content row">
                        <div class="content-title col-md-offset-2 col-md-8">
                            <h2>Một buổi tối dạo vòng quanh Đầm Sen</h2>
                        </div>
                        <div class="content-icon col-md-offset-2 col-md-8">
                            <div class="content-icon-left col-md-5">
                                <span>Ngày đăng <strong>12/12/2020</strong></span>
                            </div>
                            <div class="content-icon-right col-md-7">
                                <ul>
                                    <li>
                                        <a class="btn-icon-print" href="#">
                                            <img src="./assets/img/icon_print.svg" alt="" />
                                            <span>In bài</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="btn-icon-color" href="#">
                                            <img src="./assets/img/icon_text_zoom.svg" alt="" />
                                            <span>Màu chữ</span>
                                            <input type="text" class="input-color-picker" data-wcp-format="css" data-wcp-sliders="wv" />
                                        </a>
                                    </li>
                                    <li>
                                        <a class="btn-icon-size" href="#">
                                            <img src="./assets/img/icon_text.svg" alt="" />
                                            <span>Cỡ chữ</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a class="btn-icon-play" href="#">
                                            <img src="./assets/img/icon_play.svg"  alt="" />
                                            <span>Đọc bài</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="content-reading">
                            <div class="content-image-1 col-md-12">
                                <img src="./resources/trangthongtindientu/chitiettintuc/a1.jpg" alt="" />
                            </div>
                            <div class="content-block col-md-offset-2 col-md-8">
                                <p>Ngày 01/07/1969, Quận 11 (quận Mười Một) chính thức có tên trên bản đồ Sài Gòn – Gia Định theo sắc luật số 73 của chính quyền Sài Gòn cũ. Được tách ra từ Quận 5 và Quận 6, Quận 11 ban đầu gồm 4 phường sau đó lập thêm 2 phường nữa là Bình Thạnh và Phú Thạnh.
                                </p>
                                <p>Sau ngày Giải phóng miền Nam thống nhất đất nước (30/04/1975), khu vực Quận 11 vẫn giữ nguyên 6 phường với 47 khóm. Đến tháng 6/1976 được phân chia lại thành 21 phường.</p>
                            </div>

                            <div class="col-md-6">
                                <img src="./resources/trangthongtindientu/chitiettintuc/a2.jpg" alt="" />
                            </div>
                            <div class="col-md-6">
                                <img src="./resources/trangthongtindientu/chitiettintuc/a3.jpg" alt="" />
                            </div>

                            <div class="content-block col-md-offset-2 col-md-8">
                                <p>Ngày 02/07/1976, tại kỳ họp lần thứ nhất của Quốc hội khóa VI đã thống nhất đổi tên thành phố Sài Gòn – Gia Định thành TP.HCM, từ đó quận 11 thuộc TP.HCM.
                                </p>
                                <p>Sau nhiều lần có sự thay đổi về phân chia đơn vị hành chính, ngày 14/02/1987 quận 11 chính thức gồm 15 phường hiện hữu cho đến ngày hôm nay, theo quyết định số 33-HĐBT của Hội đồng Bộ trưởng.</p>
                            </div>
                            <div class="content-image-1 col-md-12">
                                <img src="./resources/trangthongtindientu/chitiettintuc/a4.jpg" alt="" />
                            </div>
                            <div class="content-block col-md-offset-2 col-md-8">
                                <p>
                                    Quận 11 hiện tại bao gồm 15 phường, trong đó phường 10 được xem là trung tâm, nơi đặt trụ sở của UBND quận. Tính đến cuối năm 2016, quận 11 có dân số là 235.794 người, (tỷ lệ nữ chiếm 53,18%). Người Hoa có 95.556 người (tỷ lệ 40,52%), mật độ dân số trung bình là 45.911 người/km2.
                                </p>
                            </div>
                        </div>
                        <div class="content-icon-1 col-md-offset-2 col-md-8">
                            <div class="content-icon-1-left">
                                <ul>
                                    <li>
                                        <a href="#">
                                            <img src="./assets/img/icon_facebook.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="./assets/img/icon_twitter.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="./assets/img/icon_in.svg" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <img src="./assets/img/icon_email_w.svg" alt="" />
                                        </a>
                                    </li>
                                </ul>

                            </div>
                            <div class="content-icon-1-right">
                                <span>Số người đã xem</span>
                                <p>1.354</p>
                            </div>
                        </div>
                        <div class="content-relate col-md-offset-2 col-md-8">
                            <h3>Bài viết liên quan</h3>
                            <div class="content-relate-1 col-md-4">
                                <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="news-detail" data-pi-id="1">
                                    <img src="./resources/trangthongtindientu/chitiettintuc/lq_a1.jpg" alt="" />
                                    <h4>Một buổi chiều dạo quanh <p>Quận 11</p></h4>
                                </a>
                                <span>17/07/2020</span>
                            </div>
                            <div class="content-relate-1 col-md-4">
                                <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="news-detail" data-pi-id="1">
                                    <img src="./resources/trangthongtindientu/chitiettintuc/lq_a2.jpg" alt="" />
                                    <h4>Một buổi chiều dạo quanh <p>Quận 11</p></h4>
                                </a>
                                <span>17/07/2020</span>
                            </div>
                            <div class="content-relate-1 col-md-4">
                                <a href="#" data-pi-slide="page-item-slide-3" data-pi-type="news-detail" data-pi-id="1">
                                    <img src="./resources/trangthongtindientu/chitiettintuc/lq_a3.jpg" alt="" />
                                    <h4>Một buổi chiều dạo quanh <p>Quận 11</p></h4>
                                </a>
                                <span>17/07/2020</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <!-- content end -->
</div>
<!-- content-wrap end -->
