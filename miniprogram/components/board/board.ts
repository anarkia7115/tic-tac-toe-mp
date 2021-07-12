// components/board/board.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    squares: Array
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSquareTap: function (e:{target:{dataset:{squareid:number}}}) {
      this.triggerEvent("squaretap", {
        squareid:e.target.dataset.squareid
      })
    }
  }, 
  lifetimes: {
    attached: function() {
      console.log(this.properties.squares)
    }
  }
})
