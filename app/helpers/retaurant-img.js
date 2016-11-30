import Ember from 'ember';

export function retaurantImg(params) {
  return "img/restaurants/"+params+".jpg";
}

export default Ember.Helper.helper(retaurantImg);
