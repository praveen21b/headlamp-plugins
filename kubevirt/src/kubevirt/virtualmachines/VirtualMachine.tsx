import { KubeObject } from '@kinvolk/headlamp-plugin/lib/K8s/cluster';

class VirtualMachine extends KubeObject {
  constructor(jsonData) {
    super(jsonData);
  }

  get spec() {
    return this.jsonData.spec;
  }

  get status() {
    return this.jsonData.status;
  }

  async start() {
    this.spec.runStrategy = 'Always';
    return this.update(this.jsonData);
  }

  async stop() {
    this.spec.runStrategy = 'Halted';
    return this.update(this.jsonData);
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
    return `/kubevirt/virtualmachines/${this.getName()}`;
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
  static kind = 'VirtualMachine';
  static apiVersion = 'kubevirt.io/v1';
  static isNamespaced = true;
  static apiName = 'virtualmachines';
}

// VirtualMachine.kind = 'VirtualMachine';
// VirtualMachine.apiName = 'virtualmachines';
// VirtualMachine.apiVersion = 'kubevirt.io/v1';
// VirtualMachine.isNamespaced = true;

export default VirtualMachine;
