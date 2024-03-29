import fs from 'fs'
import {type BrowserExtensionContext} from '../../types'
import getFileList from '../getFileList'

export default function emitResolverModule(
  loader: BrowserExtensionContext,
  resolverAbsolutePath: string
) {
  const options = loader.getOptions()
  const {manifestPath, includeList} = options

  const includeListModule = JSON.stringify(
    getFileList(manifestPath, includeList)
  )

  const resolverModule = fs.readFileSync(resolverAbsolutePath, 'utf8')
  const module = resolverModule.replace(
    '"__RESOLVER_MODULE_FILE_LIST__"',
    `${includeListModule}`
  )

  // Emit the resolver module. This rewrites
  // original resolver module with the new file list.
  fs.writeFileSync(resolverAbsolutePath, module)
}
