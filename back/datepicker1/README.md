## Carousel&Datepicker
##一个简陋的家伙

####1、基本配置:
        {
            id: "",                               // 初始化容器
            currDate: '',                         // 默认日期(时间戳，字符串，Date对象)
            beginDate: '1970/01/01 00:00',        // 开始日期
            endDate: '2100/01/01 00:00',          // 结束日期
            format: 'yyyy/MM/dd HH:mm:ss',        // 日期格式
            onValueChange: false                  // 值改变事件回调
        }
####2、value方法，获取或者设置值
        @参数 { Number | String } 时间戳 | 符合格式的字符串
        @返回结果 { Number | CarouselDatepicker } 时间戳 | 日期控件
####3、addValueChangeListener方法，添加控件值变更监听
        @参数 { Function } 值变更回调
####4、setBeginDate方法，设置开始限制日期
        @参数 { Number | String } 时间戳 | 符合格式的字符串
####5、setEndDate方法，设置结束限制日期
        @参数 { Number | String } 时间戳 | 符合格式的字符串