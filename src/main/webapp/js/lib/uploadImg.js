/**
 * Created by asheng on 2014/8/11 0011.
 */
(function () {

    $.fn.uploadImg = function () {
        var $this = $(this).addClass("hide"), file, imgPanel, root = $this.closest('div'), btn;

        function createHtml() {
            imgPanel = $('<ul class="unstyled"></ul>').insertAfter($this);
            file = $('<input type="file" id="myfile" class="hide">').insertAfter($this);
            btn = $('<a class="btn btn-info">上传图片</a>').insertAfter($this);
        }

        function bindEvent() {
            btn.click(function (e) {
                e.preventDefault();
                file.click();
            });
            file.change(function () {
                util.ajax.ajax({
                    url: "/image/upload",
                    el: root,
                    success: function (ret) {
                        createImg(ret.data.url);
                        var val = $this.val();
                        if (val)
                            $this.val(val + "," + ret.data.url);
                        else
                            $this.val(ret.data.url);
                    }
                }, true);
            });
            $this.change(function () {
                if (!$this.val())return;
                var imgs = $this.val().split(",");
                $.each(imgs, function () {
                    createImg(this);
                });
            });
            root.delegate("img", "click", function () {
                Qpage.Alert({title: "大图", msg: '<img src="' + this.src + '">'});
            });
            imgPanel.delegate("a", "click", function (e) {
                e.preventDefault();
                var a = $(this);
                Qpage.Confirm({msg: "确定要删除吗？", confirm: function () {
                    var panel = a.closest("li");
                    var src = panel.find("img").attr("src");
                    var val = $this.val();
                    panel.remove();
                    val = val.repeat("," + src, "");
                    val = val.repeat(src, "");
                    $this.val(val);
                }});
            });
        }

        function createImg(url) {
            var $img = $('<li style="width: 120px;  text-align: center; float: left; " ></li>');
            $img.append('<img style="height: 100px; display:block; cursor: pointer;" src="' + url + '">');
            $img.append('<a href="#">删除</a>');
            $img.appendTo(imgPanel);
        }

        createHtml();
        bindEvent();
    };

    $(".uploadImg").uploadImg();
})();