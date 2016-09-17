(function () {
    var _data = {};
    util.ajax.ajax({
        url: "/product/productCategory/queryProductCategory",
        success: function (data) {
            $.each(data.data.list, function () {
                if (this.parentId == 0) {
                    var key = "key_" + this.id;
                    if (!_data[key])
                        _data[key] = {
                            val: {},
                            list: []
                        };
                    _data[key].val = this;
                } else {
                    var key = "key_" + this.parentId;
                    if (!_data[key])
                        _data[key] = {
                            val: {},
                            list: []
                        };
                    _data[key].list.push(this);
                }
            });
            $(".categorySelect").each(function () {
                createCategorySelect($(this));
            });
        }
    });


    function createCategorySelect(el) {
        var $c1 = $('<select name="firstCategoryId" class="input-medium"></select>');
        var $c2 = $('<select name="secondCategoryId" class="input-medium"><option value="">二级类别</option></select>');
        var op1 = ['<option value="">一级类别</option>'];
        $.each(_data, function () {
            op1.push('<option value="' + this.val.id + '">' + this.val.categoryName + '</option>');
        });
        $c1.html(op1);
        el.html("").append($c1).append($c2);
        $c1.change(function () {
            var op2 = ['<option value="">二级类别</option>'];
            if ($(this).val()) {
                $.each(_data['key_' + $(this).val()].list, function () {
                    op2.push('<option value="' + this.id + '">' + this.categoryName + '</option>');
                });
            }
            $c2.html(op2);
        });
    }

})();