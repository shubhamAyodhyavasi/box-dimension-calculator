/*--------------*/
(function () {

	var items = [
		{
			h: 1,
			w: 4,
			l: 3,
		},
		{
			h: 2,
			w: 4,
			l: 2,
		},
		{
			h: 3,
			w: 3,
			l: 4,
		},
		{
			h: 4,
			w: 3,
			l: 3,
		},
		{
			h: 4,
			w: 2,
			l: 3,
		},
		{
			h: 2,
			w: 1,
			l: 4,
		},
		{
			h: 3,
			w: 2,
			l: 4,
		},
		{
			h: 1,
			w: 4,
			l: 3,
		},
	]
	function halfAddArrH(arr = [], {h, w, l}){
		return arr.map((el, i, elx) => {
			if(i % 2 === 0){
				const elNext = elx[i+1] ? elx[i+1] : {
	
				}
				return {
					...el,
					[h] : el[h] + (elNext[h] || 0),
					[w] : el[w] > (elNext[w] || 0) ? el[w] : elNext[w] ,
					[l] : el[l] > (elNext[l] || 0) ? el[l] : elNext[l] ,
				}
			}
			else return null
		}).filter(el => el)
	}
	function halfAddArrW(arr = [], {h, w, l}){
		return arr.map((el, i, elx) => {
			if(i % 2 === 0){
				const elNext = elx[i+1] ? elx[i+1] : {
	
				}
				return {
					...el,
					[h] : el[h] > (elNext[h] || 0) ? el[h] : elNext[h] ,
					[w] : el[w] + (elNext[w] || 0),
					[l] : el[l] > (elNext[l] || 0) ? el[l] : elNext[l] ,
				}
			}
			else return null
		}).filter(el => el)
	}
	function halfAddArrL(arr = [], {h, w, l}){
		return arr.map((el, i, elx) => {
			if(i % 2 === 0){
				const elNext = elx[i+1] ? elx[i+1] : {
	
				}
				return {
					...el,
					[h] : el[h] > (elNext[h] || 0) ? el[h] : elNext[h] ,
					[w] : el[w] > (elNext[w] || 0) ? el[w] : elNext[w] ,
					[l] : el[l] + (elNext[l] || 0),
				}
			}
			else return null
		}).filter(el => el)
	}
	function heightDir(arr = [], key){
		return arr.sort((a, b)=> {
			return b[key] - a[key]
		})
	}
	function getMin({h, w, l}){
		const min = Math.min(h,w,l)
		if(h === min){
			return {
				h
			}
		}else if(w === min){
			return {
				w
			}
		}else if(l === min){
			return {
				l
			}
		}else{
			return {
				h
			}
		}
	}
	function combinePack(arr) {
		if(arr.length > 1){
			var hh = heightDir(arr, "h")[0] && heightDir(arr, "h")[0].h 
			var hl = heightDir(arr, "l")[0] && heightDir(arr, "l")[0].l 
			var hw = heightDir(arr, "w")[0] && heightDir(arr, "w")[0].w 
			var min2 = getMin({
				h: hh,
				l: hl,
				w: hw,
			})
			var sKey = Object.keys(min2)[0];
			switch (sKey) {
				case "w":
					var items = halfAddArrW(arr, {h:"h", w:"w", l:"l"})
					return combinePack(items)
				case "h":
					var items = halfAddArrH(arr, {h:"h", w:"w", l:"l"})
					return combinePack(items)
				case "l":
					var items = halfAddArrL(arr, {h:"h", w:"w", l:"l"})
					return combinePack(items)
				default:
					var items = halfAddArrH(arr, {h:"h", w:"w", l:"l"})
					return combinePack(items)
			}
		}
		return arr
	}
	function combineLoop(items) {
		var item = items
		while (item.length > 1) {
			item = combinePack(item)
		}
		return item
	}
	module.exports = {
		combineLoop
	}
})()