import Vue from '~vue'
import Buefy from '~buefy'

Vue.use(Buefy);

Vue.directive('text-color', {
    inserted(el, binding) {
        console.log(binding);
        el.classList.add(`has-text-${binding.arg}`)
    }
});

Vue.directive('bg-color', {
    inserted(el, binding) {
        console.log(binding);
        el.classList.add(`has-background-${binding.arg}`)
    }
});
