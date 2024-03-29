import path from 'path'
import getHtmlResources from '../../helpers/getHtmlFileResources'
import {type Manifest, type ManifestHtmlData} from '../../types'

export default function devtools(
  manifestPath: string,
  manifest: Manifest
): ManifestHtmlData | undefined {
  if (!manifest || !manifest.devtools_page) {
    return undefined
  }

  const devtoolsPage: string = manifest.devtools_page

  const devtoolsAbsolutePath = path.join(
    path.dirname(manifestPath),
    devtoolsPage
  )

  return getHtmlResources(devtoolsAbsolutePath)
}
