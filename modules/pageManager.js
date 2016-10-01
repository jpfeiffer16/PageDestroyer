//NOTE: Requires jquery
module.exports = {
  name: 'PageManager',
  service: function() {
    var self = this;
    var collisionElements = [];
    var init = function() {
      var self = this;
      var INGNOREDTAGS = ['HTML', 'HEAD', 'BODY', 'SCRIPT', 'TITLE', 'META', 'STYLE', 'LINK', 'SCRIPT'];
      var HIDENTAGS = ['BR', 'HR'];
      
      //Sanity checks
      // if ($ == undefined)
      //   throw "PageDestoyer requires jQuery";

      function updateElements() {
        var elements = document.body.getElementsByTagName('*');
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if ((INGNOREDTAGS.indexOf(element.tagName) == -1) && hasOnlyTextualChildren(element)) {
            addClass(element, "COLLIDE");
            collisionElements.push(element);
          }
        }
      }

      function hasOnlyTextualChildren(element) {
        if (element.offsetLeft < -100 && element.offsetWidth > 0 && element.offsetHeight > 0) return false;
        if (indexOf(HIDENTAGS, element.tagName) != -1) return true;
        if (element.offsetWidth == 0 && element.offsetHeight == 0) return false;
        for (var i = 0; i < element.childNodes.length; i++) {
          if (indexOf(HIDENTAGS, element.childNodes[i].tagName) == -1 && element.childNodes[i].childNodes.length != 0) return false;
        }
        return true;
      };

      function indexOf(arr, item, from) {
        if (arr.indexOf) return arr.indexOf(item, from);
          var len = arr.length;
        for (var i = (from < 0) ? Math.max(0, len + from) : from || 0; i < len; i++) {
          if (arr[i] === item) return i;
        }
        return -1;
      };

      function addClass(element, className) {
        if (element.className.indexOf(className) == -1)
          element.className = (element.className + ' ' + className).replace(/\s+/g, ' ').replace(/^\s+|\s+$/g, '');
      };

      function removeClass(element, className) {
        element.className = element.className.replace(new RegExp('(^|\\s)' + className + '(?:\\s|$)'), '$1');
      };
      updateElements();
    };

    var update = function() {
      //TODO: Update stuff here
    };

    var collides = function(coordsObj) {
      return collisionElements.filter(function (element) {
        return (element.x < coordsObj.x) &&
          ((element.x + element.offsetWidth) > (coordsObj.x)) &&
          (element.y < coordsObj.y) &&
          ((element.y + element.offsetHeight) > (coordsObj.y));
      }).length > 0;
    };

    init();

    return {
      update: update,
      collides: collides
    };
  }
};