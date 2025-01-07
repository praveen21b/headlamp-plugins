import ApiProxy from '@kinvolk/headlamp-plugin/lib/ApiProxy';
import { StreamArgs, StreamResultsCb } from '@kinvolk/headlamp-plugin/lib/ApiProxy';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

class VirtualMachineInstance extends KubeObject {
  constructor(jsonData) {
    super(jsonData);
  }

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status;
  }

  // stop(onStop, options = {}) {
  //   const url = `/apis/kubevirt.io/v1/namespaces/${this.getNamespace()}/virtualmachines/${this.getName()}/stop`;
  //   return stream(url, onStop, { isJson: false, ...options });
  // }

  // restart(onRestart, options = {}) {
  //   const url = `/apis/kubevirt.io/v1/namespaces/${this.getNamespace()}/virtualmachines/${this.getName()}/restart`;
  //   return stream(url, onRestart, { isJson: false, ...options });
  // }

  // getConsole(onConsole, options = {}) {
  //   const url = `/apis/subresources.kubevirt.io/v1alpha3/namespaces/${this.getNamespace()}/virtualmachines/${this.getName()}/console`;
  //   const additionalProtocols = [
  //     'v4.channel.k8s.io',
  //     'v3.channel.k8s.io',
  //     'v2.channel.k8s.io',
  //     'channel.k8s.io',
  //   ];Halted
  //   return stream(url, onConsole, { additionalProtocols, isJson: false, ...options });
  // }

  getUrl() {
    return `/kubevirt/virtualmachineinstances/${this.getName()}`;
  }
  getLastStateChangeTimestamp() {
    return new Date(
      this.status?.conditions?.find(c => c.type === 'Ready')?.lastTransitionTime || 0
    );
  }

  // getDetailedStatus() {
  //   if (
  //     this.detailedStatusCache.details &&
  //     this.detailedStatusCache.resourceVersion === this.jsonData.metadata.resourceVersion
  //   ) {
  //     return this.detailedStatusCache.details;
  //   }

  //   const running = this.status?.created && this.status?.ready;
  //   const ready = this.status?.ready || false;
  //   const reason = this.status?.conditions?.find(c => c.type === 'Ready')?.reason || 'Unknown';
  //   const message = this.status?.conditions?.find(c => c.type === 'Ready')?.message || '';
  //   const lastTransitionTime = this.getLastStateChangeTimestamp();

  //   const newDetails = {
  //     running,
  //     ready,
  //     reason,
  //     message,
  //     lastTransitionTime,
  //   };

  //   this.detailedStatusCache = {
  //     resourceVersion: this.jsonData.metadata.resourceVersion,
  //     details: newDetails,
  //   };

  //   return newDetails;
  // }

  // exec() {
  //   const socket = openWebSocket(this.getUrl(), {
  //     type: 'binary',
  //     onMessage: data => {
  //       console.log('hiho', data);
  //     },
  //   });
  //   socket.then(s => {
  //     console.log(s.url);
  //   });
  //   return socket;
  // }
  exec(
    onExec: StreamResultsCb,
    options: StreamArgs
  ): { cancel: () => void; getSocket: () => WebSocket } {
    //const commandStr = command.map(item => '&command=' + encodeURIComponent(item)).join('');
    const url = `/apis/subresources.kubevirt.io/v1/namespaces/${this.getNamespace()}/virtualmachineinstances/${this.getName()}/console`;
    return ApiProxy.stream(url, onExec, {
      isJson: false,
      additionalProtocols: ['plain.kubevirt.io'],
      ...options,
    });
  }

  static kind = 'VirtualMachineInstance';
  static apiVersion = 'kubevirt.io/v1';
  static isNamespaced = true;
  static apiName = 'virtualmachineinstances';
}

// VirtualMachine.kind = 'VirtualMachine';
// VirtualMachine.apiName = 'virtualmachines';
// VirtualMachine.apiVersion = 'kubevirt.io/v1';
// VirtualMachine.isNamespaced = true;

export default VirtualMachineInstance;
