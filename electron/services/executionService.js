class ExecutionService {
  async start(data) {
    if (!window.fss?.execution) {
      return {
        success: false,
        errors: "Electron unavailable",
      };
    }

    return window.fss.execution.start(data);
  }

  subscribeProgress(callback) {
    if (!window.fss?.execution) {
      return () => {};
    }

    return window.fss.execution.onProgress(callback);
  }

  subscribeState(callback) {
    if (!window.fss?.execution) {
      return () => {};
    }

    return window.fss.execution.onState(callback);
  }

  pause() {
    return window.fss.execution.pause();
  }

  resume() {
    return window.fss.execution.resume();
  }

  cancel() {
    return window.fss.execution.cancel();
  }
}

export default new ExecutionService();