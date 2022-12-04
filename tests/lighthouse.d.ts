/// <reference types="lighthouse/types/global-lh" />

declare module 'lighthouse' {
  function lighthouse(
    url: string,
    options: Partial<LH.CliFlags>,
  ): Promise<LH.RunnerResult>
  export default lighthouse
}
