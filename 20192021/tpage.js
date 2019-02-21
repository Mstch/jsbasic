  class PageNation {
        constructor(jqselector, arg) {
            let self = this;
            let tempcurrent;
            Object.defineProperties(self, {
                current: {
                    get() {
                        return tempcurrent;
                    },
                    set(value) {
                        tempcurrent = value;
                        self.render();
                    }
                }
            })
            this.current = arg.current || 1;
            this.jqdom = $(jqselector);
            this.dataCount = arg.total;
            this.total = arg.total;
            this.size = arg.size || 10;
            this.pageCount = parseInt(this.dataCount / this.size);
            let pageNation = this;
            this.alldata = arg.data || [];
            this.pageNationInFronend = arg.pageNationInFronend;
            if (this.pageNationInFronend) {
                this.data = this.alldata.slice(-1, -1 * this.size);
            } else {
                this.data = this.alldata;
            }
            this.jqdom.empty();

            this.jqdom.append('<span class="datatltao">总' + this.dataCount + '条数据</span>');
            this.jqdom.append('<div class="opbtns lowerBtns"></div>');
            let lowerBtns = this.jqdom.find(
                '.lowerBtns');

            lowerBtns.append('<button class="pagenationfrist">首页</button>');
            this.firstBtn = lowerBtns.find(
                '.pagenationfrist');
            this.firstBtn.click(() => {
                this.first();
                //  this.current = 1;
                // this.render();
            });

            lowerBtns.append('<button class="pagenationpre">上一页</button>');
            this.preBtn = lowerBtns.find(
                '.pagenationpre');
            this.preBtn.click(() => {
                this.pre();
                //this.current--;
                // this.render();
            });


            this.jqdom.append('<div id="pagebtngroup"></div>');
            this.pagenumCointer = this.jqdom.find(
                '#pagebtngroup');
            for (let i = 0; i < 5; i++) {
                this.pagenumCointer.append('<button class="pagenum">' + (i + this.current) + '</button>')
            }
            this.pagenumCointer.find('button').click((event) => {
                this.current = $(event.target).text();
                // this.render();
            });
            this.pagenumCointer.find('button.select').css({
                'color': '#fff',
                'background': '#2083'
            })
            this.jqdom.append('<div class="opbtns upperBtns"></div>');
            let upperBtns = this.jqdom.find(
                '.upperBtns');
            upperBtns.append('<button class="pagenationnext">下一页</button>');
            this.nextBtn = upperBtns.find(
                '.pagenationnext');
            this.nextBtn.click(() => {
                this.next();
                // this.current++;
                // this.render();
            });
            upperBtns.append('<button class="pagenationnlast">末页</button>');
            this.lastBtn = upperBtns.find(
                '.pagenationnlast');
            this.lastBtn.click(() => {
                this.last();
                //  this.current = this.pageCount;
                // this.render();
            });

            this.jqdom.append('<div class="pagejump"></div>');
            let pagejump = this.jqdom.find(
                '.pagejump');
            pagejump.append('<span class="totalspan">总&nbsp;<span class="totalpage"></span>&nbsp;页<span>');
            pagejump.append('<span class="totalspan">&nbsp;前往<input class="jumppagenum" min="1" max="' + this.pageCount +
                '" type="number"/>页&nbsp;<button class="jumpbtn">跳转</button><span>');
            this.jumpbtn = pagejump.find(
                '.jumpbtn');
            this.jumpbtn.click(() => {
                this.jump();
                // this.current = parseInt($('.jumppagenum').val()) || 1;
                // this.render();
            });

            this.render();
            this.jqdom.addClass('tpagenation');
        }
        render() {
            let current = this.current;
            let total = this.total||this.pageCount;
            if (current < 0 || current > total) {
                alert('跳转的页数非法哦');
                return;
            }
            let pagenumBtnGroup = this.jqdom.find('#pagebtngroup').find('button');
            pagenumBtnGroup.removeClass('select');
            if (current == 1) {
                this.preBtn.hide(10);
            } else {
                this.preBtn.show(10);
            }
            if (current == total) {
                this.nextBtn.hide(10);
            } else {
                this.nextBtn.show(10);
            }
            this.jqdom.find('.totalpage').text(this.pageCount);
            if (total >= 5) {
                pagenumBtnGroup.show();
                if (current < 3) {
                    for (let i = 0; i < 5; i++) {
                        pagenumBtnGroup.eq(i).text(parseInt(current) + i)
                    }
                } else if (current > total - 3) {
                    for (let i = 0; i < 5; i++) {
                        pagenumBtnGroup.eq(i).text(parseInt(total) - 4 + i);
                    }
                } else {
                    for (let i = 0; i < 5; i++) {
                        pagenumBtnGroup.eq(i).text(parseInt(current) - 2 + i);
                    }
                }
            } else {
                for (let i = total; i <= 5; i++) {
                    pagenumBtnGroup.eq(i).hide(10);
                }
            }
            for (let i = 0; i < 5; i++) {
                if (pagenumBtnGroup.eq(i).text() == current) {
                    pagenumBtnGroup.eq(i).addClass('select');
                }
            }
        }
        next(fn) {
            if (fn) this._nextCallBack = fn;
            else {
                this.current++;
                if (this._nextCallBack) this._nextCallBack();
            }
        }
        pre(fn) {
            if (fn) this._preCallBack = fn;
            else {
                this.current--;
                if (this._preCallBack) this._preCallBack();
            }
        }
        first(fn) {
            if (fn) this._preCallBack = fn;
            else {
                this.current = 1;
                if (this._preCallBack) this._preCallBack();
            }
        }
        last(fn) {

            if (fn) this._lastCallBack = fn;
            else {
                this.current = this.pageCount;
                if (this._lastCallBack) this._lastCallBack();
            }
        }
        jump(fn) {
            if (fn) this._nextCallBack = fn;
            else {
                this.current = parseInt($('.jumppagenum').val()) || 1;
                if (this._nextCallBack) this._nextCallBack();
            }
        }
    }