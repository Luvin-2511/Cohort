import { k8sCoreV1Api } from './config.js'

export async function createPod(sandboxId) {
    const podManifest = {
        metadata:{
            name: `sandbox-deployment-${sandboxId}`,
        },
        spec: {
            containers:[
                {
                    sandboxId:sandboxId
                }
            ]
        }
    }
}
