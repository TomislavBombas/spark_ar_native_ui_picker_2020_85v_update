
// Load the modules

const Scene = require('Scene');

const NativeUI = require('NativeUI');

const Textures = require('Textures');


// First, we create a Promise and load all the assets we need for our scene
//In this arry put the names of your icons. They will be populated in Promisse later to be used in pickerUI
let iconsArray = ['icon-1', 'icon-BC', 'icon-CA', 'icon-LE', 'icon-PP', 'icon-ML', 'icon-PO', 'icon-PA', 'icon-SU', 'icon-SM', 'icon-KV', 'icon-BG', 'icon-ZR', 'icon-SO', 'icon-KI', 'icon-NI', 'icon-UE'];
//In this array put the names of your objects you wish to choose from with pickerUI.
let meshArray = ['MaskPK', 'MaskBC', 'MaskCA', 'MaskLE', 'MaskPP', 'MaskML', 'MaskPO', 'MaskPA', 'MaskSU', 'MaskSM', 'MaskKV', 'MaskBG', 'MaskZR', 'MaskSO', 'MaskKI', 'MaskNI', 'MaskUE'];
let objectList = [];
function makeAList() {
    Array.prototype.forEach.call(iconsArray, function (element){
        objectList.push(Textures.findFirst(element));
    });
    Array.prototype.forEach.call(meshArray, function (element){
        objectList.push(Scene.root.findFirst(element));
    });
    Promise.all(objectList).then(function (results) {
        let buttons = [];
        let objects = [];
        // First, we set the buttons for the NativeUI Picker
        for (let i = 0; i < iconsArray.length; i++) {
            buttons.push(results[i]);
        }
        let imageTextures = [];
        for (let i = 0; i < iconsArray.length; i++) {
            imageTextures.push( {image_texture: buttons[i]} );
        }
        // Next, we set the Objacts for the switch
        for (let i = 0; i < iconsArray.length; i++) {
            objects.push(results[i + iconsArray.length]);
        }
        
        // Now, we can finally start building the NativeUI Picker
        const configuration = {
            selectedIndex: 0,
            // These are the image textures to use as the buttons in the NativeUI Picker
            items: imageTextures
    
        };
    
        // Create the NativeUI Picker
        const picker = NativeUI.picker;
        picker.configure(configuration);
        picker.visible = true;
    
        // This is a monitor that watches for the picker to be used.
        picker.selectedIndex.monitor().subscribe(function (val) {
            for (let i = 0; i < objects.length; i++) {
                objects[i].hidden = true;
            }
            objects[val.newValue].hidden = false;
        });
    });
}
makeAList();
