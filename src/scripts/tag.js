function queryURLstring () {
  // This function is anonymous, is executed immediately and
  // the return value is assigned to QueryString!
  let i = 0
  let queryObj = {}
  let pair
  let queryStr = window.location.search.substring(1)
  let queryArr = queryStr.split('&')
  for (i = 0; i < queryArr.length; i++) {
    pair = queryArr[i].split('=')
    // If first entry with this name
    if (typeof queryObj[pair[0]] === 'undefined') {
      queryObj[pair[0]] = pair[1]
      // If second entry with this name
    } else if (typeof queryObj[pair[0]] === 'string') {
      queryObj[pair[0]] = [queryObj[pair[0]], pair[1]]
      // If third or later entry with this name
    } else {
      queryObj[pair[0]].push(pair[1])
    }
  }
  return queryObj
}

// 显示对应的post
let filterPostByTag = function (attrName, tag) {
  let allPostItem = document.getElementsByClassName('post-item')
  // 过滤post
  Array.prototype.forEach.call(allPostItem, function (postItem) {
    let postTags = postItem.getAttribute(`data-${attrName}`)
    let tagArray = postTags.split('%+%')
    if (tagArray.indexOf(tag) >= 0 || tag === '' || typeof tag === 'undefined') {
      postItem.style.display = 'block'
    } else {
      postItem.style.display = 'none'
    }
  })

  // 过滤年份
  let yearSections = document.getElementsByClassName('year-section')
  Array.prototype.forEach.call(yearSections, function (section) {
    let isAllHidden = true
    let posts = section.getElementsByClassName('post-item')
    isAllHidden = Array.prototype.every.call(posts, function (post) {
      return window.getComputedStyle(post).getPropertyValue('display') === 'none'
    })
    if (isAllHidden) {
      section.style.display = 'none'
    } else {
      section.style.display = 'block'
    }
  })
}

// 绑定点击dom
let onClickTag = function (e, attrName) {
  let currTag = e.target
  let tagName = null

  while (currTag !== e.currentTarget) {
    if (Object.prototype.toString.call(currTag.getAttribute(attrName)) !== '[object Null]') {
      tagName = currTag.getAttribute(attrName)
      break
    }
    currTag = currTag.parentNode
  }

  if (Object.prototype.toString.call(tagName) === '[object Null]') {
    return
  }

  let attrNameWithoutData = /data-(.*)/.exec(attrName)[1]
  window.history.replaceState(null, '', window.location.href.split('?')[0] + `?${attrNameWithoutData}=` + tagName)
  filterPostByTag(attrNameWithoutData, tagName)
}

let tags = document.getElementsByClassName('tags')[0]
let categories = document.getElementsByClassName('categories')[0]
tags.addEventListener('click', function (e) {
  onClickTag(e, 'data-tag')
})
categories.addEventListener('click', function (e) {
  onClickTag(e, 'data-category')
})

// 根据URL初始化
let URLquery = queryURLstring()
filterPostByTag('tag', URLquery.tag)
