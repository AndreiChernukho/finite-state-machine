class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;
        this.states = config.states;
        this.state = config.initial;
        this.previousState = false;
        this.nextState = false;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {
            this.previousState = this.state;
            this.state = state;
        }
        else {
            throw new Error();
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        this.previousState = this.state;
        let transitions = this.states[this.state].transitions;

        if (event in transitions) {
            this.state = transitions[event];
        }
        else {
            throw new Error();
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
        this.previousState = false;
        this.nextState = false;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let list = [];
        if (event === undefined) {
            list = Object.keys(this.states);

        } else {
            let stateKeys = Object.keys(this.states);
            for (let state of stateKeys){
                let transitions = this.states[state].transitions;
                if(event in transitions){
                    list.push(state); 
                }
            }
        }
        return list;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.previousState) {
            this.nextState = this.state;
            this.state = this.previousState;
            this.previousState = false;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.nextState) {
            this.previousState = this.state;
            this.state = this.nextState;
            this.nextState = false;
            return true;
        } else {
            return false;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.previousState = false;
        this.nextState = false;
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/