import { createProvider } from './frame-api.js';
(async () => {

    const app = fin.Application.getCurrentSync();

    await app.on('window-closed', async () => {
        const childWindows = await app.getChildWindows();
        if (childWindows.length < 1) {
            app.close();
        }
    });

    //Create "main" window
    const { customData } = await fin.Window.getCurrentSync().getOptions();
    const winOption = {
        name: 'child',
        defaultWidth: 1700,
        defaultHeight: 900,
        url: location.href.replace('index', 'view-container'),
        frame: false,
        autoShow: true,
        customData,
        resizeRegion: {
            bottomRightCorner: 20
        },
        backgroundThrottling: true
    };

    await fin.Window.create(winOption);

    //Create channel
    await createProvider();
    
    
	    let myWin = await fin.Layout.createWindow({
	    layoutConfig: {
	        content: [{
	            type: 'stack',
	            content:[{
	                type: 'component',
	                componentName: 'view',
	                componentState: {
	                    name: 'my-new-test-view',
	                    url: 'http://www.example.com' // The URL of the View
	                }
	            }]
	        }]
	    }
	});
	
	fin.Layout.createView(
	    { // View Configuration Options
	        name: 'my-new-test-view-2',
	        url:'http://www.example.com'
	    }, 
	    myWin.identity // Target Identity
	);


})();