axios.get('../json/bannerTab.json').then(
    function(res) {
        tabListShow(res)
    }
).catch(function(err) {
    console.log(err)
})

// 插入HTML
function tabListShow(res) {
    let tabList = res.data.data
    let str = ''
    for (let i = 0; i < tabList.length; i++) {
        str += '<div>' + tabList[i].name + '<svg class="xiangyou" aria-hidden="true"> <use xlink: href = "#icon-xiangyou1" > < /use> </svg> </div>'
    }
    document.getElementsByClassName('banner_left')[0].innerHTML = str
}

axios.get('../json/bannerimg.json').then(
    function(res) {
        showBannerImg(res)
    }
).catch(function(err) {
    console.log(err)
})

//轮播图
function showBannerImg(res) {
    let imgList = res.data.data[0].banner_list
    let str = ''
    for (let i = 0; i < imgList.length; i++) {
        str += '<img class="banner_right_img" src="' + imgList[i].img + '" alt="">'
    }
    document.getElementsByClassName('banner_right')[0].innerHTML = str

    // 圆点的数据获取
    getDot()

    function getDot() {
        let dotLength = res.data.data[0].banner_list.length
        let str = ''
        for (let i = 0; i < dotLength; i++) {
            if (i === 0) {
                str += '<div class="banner_dot active"></div>'
            } else {
                str += '<div class="banner_dot"></div>'
            }
        }
        document.getElementsByClassName('dot_list')[0].innerHTML = str

    }

    //图片的展示设置
    let index = 0
    let timer = null
    let imgHtml = document.getElementsByClassName('banner_right_img')
    for (let i = 0; i < imgHtml.length; i++) {
        if (index === i) {
            imgHtml[i].style.opacity = 1
        } else {
            imgHtml[i].style.opacity = 0
        }
    }

    // 图片轮播
    imgAuto()

    function imgAuto() {
        timer = setInterval(function() {
            index++
            imgShow()
        }, 1000)
    }

    //更换图片
    function imgShow() {
        if (index < 0) {
            index = imgHtml.length - 1
        }
        if (index > imgHtml.length - 1) {
            index = 0
        }
        for (let i = 0; i < imgHtml.length; i++) {
            imgHtml[i].style.opacity = 0
        }
        imgHtml[index].style.opacity = 1
        dotStateChange()
    }

    // 圆点的选中状态切换
    function dotStateChange() {
        let banner_dot = document.getElementsByClassName('banner_dot')
        for (let i = 0; i < banner_dot.length; i++) {
            banner_dot[i].classList.remove('active')
        }
        banner_dot[index].classList.add('active')
    }

    // 上一张切换
    let xiangzuo_pre = document.getElementsByClassName('xiangzuo_pre')[0]
    xiangzuo_pre.onclick = function() {
        index--
        imgShow()
    }

    // 下一张切换
    let xiangyou_next = document.getElementsByClassName('xiangyou_next')[0]
    xiangyou_next.onclick = function() {
        index++
        imgShow()
    }

    //圆点的点击切换
    let banner_dot = document.getElementsByClassName('banner_dot')
    for (let i = 0; i < banner_dot.length; i++) {
        banner_dot[i].onclick = function() {
            index = i
            imgShow()
        }
        banner_dot[i].addEventListener('mouseover', function() {
            clearInterval(timer)
        })
        banner_dot[i].addEventListener('mouseout', function() {
            imgAuto()
        })
    }

    // 上一张的鼠标交互
    xiangzuo_pre.addEventListener('mouseover', function() {
        clearInterval(timer)
    })

    xiangzuo_pre.addEventListener('mouseout', function() {
        imgAuto()
    })

    // 下一张的鼠标交互
    xiangyou_next.addEventListener('mouseover', function() {
        clearInterval(timer)
    })

    xiangyou_next.addEventListener('mouseout', function() {
        imgAuto()
    })

    let banner_left_list = document.getElementsByClassName('banner_left')[0].getElementsByTagName('div')
    for (let i = 0; i < banner_left_list.length; i++) {
        banner_left_list[i].addEventListener('mouseover', function() {
            banner_left_list[i].classList.add('active')
        })
        banner_left_list[i].addEventListener('mouseout', function() {
            banner_left_list[i].classList.remove('active')
        })
    }
}