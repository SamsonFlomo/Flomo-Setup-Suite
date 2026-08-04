class ExecutionProgressService {

    constructor() {

        this.listeners = [];

    }

    subscribe(callback) {

        this.listeners.push(callback);

    }

    unsubscribe(callback) {

        this.listeners =
            this.listeners.filter(
                listener => listener !== callback
            );

    }

    notify(progress) {

        this.listeners.forEach(listener =>

            listener(progress)

        );

    }

}

export default new ExecutionProgressService();