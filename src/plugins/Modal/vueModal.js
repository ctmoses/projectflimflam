import Modal from './Modal';

const Plugin = {
    install(Vue) {
        Vue.component('vue-modal', Modal);

        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return;
        }

        this.installed = true;
        this.event = new Vue();

        /**
         * This sets the available methods to be called from within other components.
         * Can be used in other components like `this.$modal.show(...)`
         */
        // eslint-disable-next-line
        Vue.prototype.$modal = {

            /**
             * Makes the modal visible
             * @param {Boolean} makeVisible - whether the modal should be visible or not
             * @param {*} template - The component template to be used as the modal body
             * @param {*} props - any props that should be passed in to the body component
             */
            show (makeVisible, template, props) {
                if (template) {
                    Plugin.event.$emit('toggle', true, template, props);
                }
            },

            /**
             * Makes the modal invisible
             */
            close () {
                Plugin.event.$emit('toggle');
            },
        };
    },
};

export default Plugin;

// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(Plugin);
}
