module.exports = {
  toolkitConfig: {
    group: 'fe-node',
    mergeConfig: {
      removeSourceBranch: false, // 合并请求是否删除源分支
      squash: false,
      urgentMessage: false, // 开启加急
      reviewerEmail: ['zhoupf@seirobotics.net'], // 审批人邮箱
    },
    flowConfig: {
      devBranch: 'dev-',
      releaseBranch: 'release-',
      reviewerAutoMerge: true,
      mergeSuccessRunPipeline: false,
      finishReleaseRemoveSourceBranch: true, // 完成release后是否删除源分支，不建议保留
    },
  },
};
