import { html, render } from 'https://unpkg.com/lit-html@1.0.0/lit-html.js';
import { getClient, createWindow, moveView } from './frame-api.js';
import { ResizableView } from './resizable-view.js';
import { delay } from './utils.js';
//register service worker

const popoutIcon = html`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="12" height="12" viewBox="0 0 16 16" style=" fill:white;"><g id="surface1"><path style=" " d="M 4 2 C 2.898438 2 2 2.898438 2 4 L 2 11.5 L 3 10.5 L 3 4 C 3 3.449219 3.449219 3 4 3 L 11 3 C 11.550781 3 12 3.449219 12 4 L 12 12 C 12 12.550781 11.550781 13 11 13 L 5.5 13 L 4.5 14 L 11 14 C 12.101563 14 13 13.101563 13 12 L 13 4 C 13 2.898438 12.101563 2 11 2 Z M 4.464844 8 L 5.878906 9.414063 L 1.023438 14.269531 L 1.726563 14.980469 L 6.585938 10.121094 L 8 11.535156 L 8 8 Z "></path></g></svg>`;

class ViewLayout extends HTMLElement {
    constructor() {
        super();
        this.render = this.render.bind(this);
        this.save = this.save.bind(this);
        this.restore = this.restore.bind(this);
        this.restoreDefault = this.restoreDefault.bind(this);
        this.getStorageKey = this.getStorageKey.bind(this);
        this.getDefaultConfig = this.getDefaultConfig.bind(this);
        this.createChannelConnections = this.createChannelConnections.bind(this);
        this.generateLayoutConfig = this.generateLayoutConfig.bind(this);
        this.getBrowserViewComponent = this.getBrowserViewComponent.bind(this);
        this.removeHeader = this.removeHeader.bind(this);
        this.addHeader = this.addHeader.bind(this);
        this.attachCloseButtonListener = this.attachCloseButtonListener.bind(this);

        this.layout = null;
        this.isDragging = false;


        this.createChannelConnections();
        this.render();
    }

    //TODO: get better names around this.
    async createChannelConnections() {
        const { identity } = fin.Window.getCurrentSync();
        this.client = await getClient();

        this.client.register('add-view', async (viewConfig) => {

            const content = {
                type: 'component',
                componentName: 'browserView',
                componentState: viewConfig
            };

            this.layout.root.contentItems[0].addChild(content);
            var bv = this.getBrowserViewComponent(viewConfig.identity);
            const rView = new ResizableView(bv.componentState);
            rView.renderIntoComponent(bv);

            const views = this.layout.root.getComponentsByName('browserView');

            const viewCount = views.length;
            if (viewCount > 1) {
                this.addHeader(bv);
            }

            return content;
        });

        this.client.register('get-views', async () => {
            return this.layout.root.getComponentsByName('browserView').map(bv => bv.componentState);
        });

        this.client.register('remove-view', async (viewConfig) => {
            var bv = this.getBrowserViewComponent(viewConfig.identity);
            await fin.BrowserView.wrapSync(viewConfig.identity).hide();
            bv.container.tab.contentItem.remove();
        });

        await fin.InterApplicationBus.subscribe({ uuid: '*' }, 'should-tab-to', async (identity) => {
            const views = this.layout.root.getComponentsByName('browserView').map(bv => bv.componentState);
            for (let v of views) {
                await moveView(v, fin.Window.getCurrentSync().identity, identity);
            }
        });
    }

    removeHeader(view) {
        view.container.tab.header.position(false);
    }

    addHeader(view) {
        view.container.tab.header.position('top');
    }

    getBrowserViewComponent(identity) {
        return this.layout.root.getComponentsByName('browserView').find(bv => bv.componentState.identity.name === identity.name);
    }

    getStorageKey() {
        const identity = fin.Window.getCurrentSync().identity;
        return encodeURI(`${identity.uuid}-${identity.name}-of-gl-state`);
    }

    setupListeners() {
        const win = fin.Window.getCurrentSync();
        this.layout.on('tabCreated', this.onTabCreated.bind(this));
        this.layout.on('itemDestroyed', this.onItemDestroyed.bind(this));
        this.layout.on('initialised', this.initializeViews.bind(this));
        win.on('minimized', () => {
            win.once('restored', () => {
                // this.layout.updateSize(); todo: fix.
            });
        });
    }

    onTabCreated(tab) {
        this.isDragging = false;
        this.injectPopoutButton(tab);
        this.attachCloseButtonListener(tab);

        if (tab._dragListener) {
            const identity = tab.contentItem.config.componentState.identity;
            const dragListener = tab._dragListener;
            dragListener.on('drag', this.onTabDrag.bind(this, tab._dragListener, identity));
        }
    }

    attachCloseButtonListener(tab) {
        //This is going to be strange....todo: remove it.
        const closeButton = tab.element[0].getElementsByClassName("lm_close_tab")[0];
        closeButton.addEventListener('click', async () => {
            const view = fin.BrowserView.wrapSync(tab.contentItem.container.getState().identity);
            await view.destroy();
        });
    }

    injectPopoutButton(tab) {
        const onPopooutButtonClick = async () => {
            const viewId = tab.contentItem.container.getState().identity;
            const viewState = tab.contentItem.container.getState();

            const popupLayout = this.generateLayoutConfig(viewState);
            tab.contentItem.remove();
            await createWindow(popupLayout);
        };

        const popoutButton = html`<div @click=${onPopooutButtonClick}>${popoutIcon}</div>`;
        const closeButton = tab.element[0].getElementsByClassName("lm_close_tab")[0];
        const wrapper = document.createElement('div');
        wrapper.className = 'popout-button';
        render(popoutButton, wrapper);
        tab.element[0].insertBefore(wrapper, closeButton);
    }

    async onItemDestroyed(e) {
        //Need to wait a bit for the view to move (on a drag and drop)
        await delay(100);
        if (e.componentName === 'browserView') {
            const views = this.layout.root.getComponentsByName('browserView');
            const viewCount = views.length;
            if (viewCount === 1) {
                this.removeHeader(views[0]);
            }
            if (viewCount === 0) {
                const currWin = fin.Window.getCurrentSync();
                currWin.close().catch(console.error);
            }
        }
    }

    onTabDrag(dragListener, tabIdentity) {
        if (!this.isDragging) {
            this.isDragging = true;
            const allViews = this.layout.root.getComponentsByName('browserView').map(item => item.container.getState().identity);
            allViews.push(tabIdentity); // we have to add currently dragged tab manualy since it's not in the DOM atm
            allViews.forEach(view => fin.BrowserView.wrapSync(view).hide());
            const onDragEnd = (e) => {
                this.isDragging = false;
                allViews.forEach(async(view) => {
                    fin.BrowserView.wrapSync(view).show();
                });
                dragListener.off('dragStop', onDragEnd);
            };
            dragListener.on('dragStop', onDragEnd);
        }
    }

    async attachViews() {
        const browserViews = this.layout.root.getComponentsByName('browserView');
        console.log('attaching views');
        browserViews.forEach(async(bv) => {
            const rView = new ResizableView(bv.componentState);
            await rView.renderIntoComponent(bv);

        });
        const viewCount = browserViews.length;

        if (viewCount === 1) {
            this.removeHeader(browserViews[0]);
        }
    }

    async getDefaultConfig() {
        const { customData } = await fin.Window.getCurrentSync().getOptions();
        return customData;
    }

    async render() {
        //Restore the layout.
        await this.restore();
        this.setupListeners();
        this.layout.init();

        const win = fin.Window.getCurrentSync();

        win.on('close-requested', async () => {
            await this.save();
            await win.close(true);
        });
    }

    async initializeViews() {
        await this.attachViews();
    }

    async save() {
        if (this.layout) {
            const config = this.layout.toConfig();
            if (!config.content || !config.content.length) return;
            const state = JSON.stringify(config);
            localStorage.setItem(this.getStorageKey(), state);
        }
    }

    findViewWrapper({ name, uuid }) {
        return this.layout.root.getComponentsByName('browserView')
            .filter(wrapper =>
                wrapper.componentState.identity.name === name &&
                wrapper.componentState.identity.uuid === uuid
            );
    }

    //TODO: figure out how to iterate over a saved layout to get the browser view information.
    async restore() {
        const savedState = localStorage.getItem(this.getStorageKey());

        if (this.layout) {
            this.layout.destroy();
        }

        if (savedState !== null) {
            this.layout = new GoldenLayout(JSON.parse(savedState));
        } else {
            const { customData } = await fin.Window.getCurrentSync().getOptions();
            this.layout = new GoldenLayout(customData);
        }

        this.layout.registerComponent('browserView', function (container, componentState) {
            return { componentState, container };
        });
    }

    async restoreDefault() {
        localStorage.removeItem(this.getStorageKey());
        this.restore();
    }

    generateLayoutConfig(componentState) {

        return {
            settings: {
                showPopoutIcon: false,
                showMaximiseIcon: false,
                showCloseIcon: false,
                constrainDragToContainer: false
            },
            content: [{
                type: 'row',
                content: [{
                    type: 'stack',
                    content: [{
                        type: 'component',
                        componentName: 'browserView',
                        componentState
                    }]
                }]
            }]
        };
    }
}


customElements.define('view-layout', ViewLayout);