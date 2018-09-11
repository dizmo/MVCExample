/*global inputField slider property */
/* eslint-disable no-console */
/* eslint no-console: ['error', { allow: ['warn', 'error',  ':'] }] */
/*- eslint no-unused-vars: ["error", { "args": "none" }]*/
/*- eslint no-irregular-whitespace: ["error", { "skipTemplates": true }]*/
/*- eslint-disable no-irregular-whitespace */
/*- eslint-disable no-undef */
/*- eslint-disable no-empty */
/*- eslint-disable no-unused-vars */
window.property={
  get: function(path){ return dizmo.privateStorage.getProperty(path); },
  set: function(path,value) { dizmo.privateStorage.setProperty(path,value); },
  delete: function(path){ dizmo.privateStorage.deleteProperty(path); },
  subscribe: function(path,cb,subscriptRegisterCB) { dizmo.privateStorage.subscribeToProperty(path,cb,subscriptRegisterCB); }
};
window.showBack = () => { dizmo.showBack(); };
window.showFront = () => { dizmo.showFront(); };
window.i18n((err, t) => { document.getElementById('done').textContent = t('done'); });
function initModel() {
  dizmo.canDock(false);
  var value = property.get('value');
  if (typeof value !== 'number') { property.set('value',50); }
}
function initView(){
  function displayValue(val) {
    inputField.val(val);
    slider.dslider('value', val);
  }
  property.subscribe('value',
    function(path, value) { displayValue(value); },
    function() { displayValue(property.get('value')); }
  );
  displayValue(property.get('value'));
}
function initControl(){
  function setValue(val) { property.set('value', val); }
  document.getElementById('done').onclick = () => { dizmo.showFront(); };
  slider.dslider({ max: 100, min: 0, step: 1, onSliderMoved: function(v) { setValue(v); } }).dslider('update');
  inputField.keypress(function(e) {
    if (e.which == 13) { var v = parseInt(inputField.val()); setValue((0 <= v && v <= 100) ? v : 50); }
  });
}
document.addEventListener('dizmoready', () => {
  window.inputField=DizmoElements('#inputfield');
  window.slider=DizmoElements('#slider');
  initModel();
  initControl();
  initView();
});
