/*
 * 作用：查找指定元素在数组中第一次出现的索引
 * @param value 待查找的值
 * @param array 数组
 * @return 返回value在array数组中第一次出现的索引，如果不存在，返回-1
 */
function inArray(value, array) {
	/* 浏览器支持使用数组的 indexOf() 方法 */
	if (Array.prototype.indexOf)
		return array.indexOf(value);
	/* 浏览器不支持使用数组的 indexOf() 方法 */
	for (var i = 0, len = array.length; i < len; i++) {
		if (value === array[i])
			return i;
	}
	return -1;
}

/*
 * 作用：日期时间格式化
 * @param datetime 待格式化的日期时间对象(Date对象)
 * @return 返回格式化后的日期时间字符串：yyyy-MM-dd HH:mm:ss
 */
function format(datetime) {
	var year = datetime.getFullYear(),
		month = ("0" + (datetime.getMonth() + 1)).slice(-2),
		date = ("0" + datetime.getDate()).slice(-2),
		hour = ("0" + datetime.getHours()).slice(-2),
		min = ("0" + datetime.getMinutes()).slice(-2),
		second = ("0" + datetime.getSeconds()).slice(-2);

	return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + second;
}

/*
 * 作用：根据类名查找元素
 * @param className 待查找类名
 * @param context 查询上下文
 * @return 查找到的元素的集合
 */
function getElementsByClassName(className, context) {
	context = context || document;
	/* 支持使用 */
	if (context.getElementsByClassName) 
		return context.getElementsByClassName(className);

	/* 
	 * 不支持使用
	 * 算法：查找出所有元素，
	 * 遍历每个元素判断其使用的类名中是否有待查找的类名
	 * 如果在遍历到的元素中有使用待查找的类名，
	 * 则说明遍历到的元素是需要找出的元素其中之一
	 */
	// 存放所有查找到元素的数组变量
	var result = [];
	// 查找出所有元素
	var elements = context.getElementsByTagName("*");
	// 遍历每个元素
	for (var i = 0, len = elements.length; i < len; i++) {
		// 获取当前遍历到元素的所有类名
		var classNames = elements[i].className.split(" ");
		// 判断在所有类名中是否存在待查找的类名
		if (inArray(className, classNames) !== -1) {
			// 存在，则说明当前遍历到的元素是要查找元素其中之一
			result.push(elements[i]);
		}
	}
	// 将所有查找到的元素数组返回
	return result;
}

/*
 * 作用：根据元素的id，类名或标签名查找元素
 * @param selector 选择器字符串 支持#id，.className，  tagName
 * @param context 查找上下文对象，可选参数，默认为 document
 * @return 返回查找到的元素（元素集合）
 */
function $(selector, context) {
	// 如果未传递 context ，默认为 document
	context = context || document;

	if (selector.indexOf("#") === 0) // id选择器
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // 类选择器
		return getElementsByClassName(selector.slice(1), context);
	// 元素选择器
	return context.getElementsByTagName(selector);
}

/*
 * 作用：获取/设置指定元素的指定CSS属性值
 * @param element 元素
 * @param attrName CSS属性名
 * @param attrValue 设置的CSS属性值，可选
 * @return 查找到的CSS属性值
 */
 function css(element, attrName, attrValue) {
 	// reading
 	if (typeof attrName === "string" && typeof attrValue === "undefined")
	 	return window.getComputedStyle 
	 			? getComputedStyle(element)[attrName]
	 			: element.currentStyle[attrName];
	// writing
	if (typeof attrName === "object") {
		for (var prop in attrName) {
			element.style[prop] = attrName[prop];
		}
	} else {
		element.style[attrName] = attrValue;
	}
}
/*function css(element, attrName, attrValue) {
	if (window.getComputedStyle) // 支持使用 getComputedStyle() 
		return getComputedStyle(element)[attrName];
	// IE9之前不支持使用 getComputedStyle() 方法
	return element.currentStyle[attrName];
}*/