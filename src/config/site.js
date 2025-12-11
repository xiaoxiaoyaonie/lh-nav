// 网站配置文件 - 统一管理所有可配置项
// 支持环境变量配置,如果没有配置则使用默认值

/**
 * 获取网站配置
 * @returns {Object} 网站配置对象
 */
export const getSiteConfig = () => {
  return {
    // 网站基本信息
    siteName: import.meta.env.VITE_SITE_NAME || '猫猫导航',
    siteTitle: import.meta.env.VITE_SITE_TITLE || '猫猫导航',
    siteDescription: import.meta.env.VITE_SITE_DESCRIPTION || '一个简洁、美观的导航网站,收录优质网站资源',
    
    // 页面标题配置
    homeTitle: import.meta.env.VITE_HOME_TITLE || '猫猫导航 - 首页',
    adminTitle: import.meta.env.VITE_ADMIN_TITLE || '管理后台 - 猫猫导航',
    
    // Logo 和图标
    logoPath: import.meta.env.VITE_LOGO_PATH || '/logo.png',
    faviconPath: import.meta.env.VITE_FAVICON_PATH || '/favicon.ico',
    
    // GitHub 信息
    githubUrl: import.meta.env.VITE_GITHUB_URL || 'https://github.com/xiaoxiaoyaonie/lh-nav',
    githubAuthor: import.meta.env.VITE_GITHUB_AUTHOR || 'maodeyu180',
    
    // 功能开关
    enableLock: import.meta.env.VITE_OPEN_LOCK === 'true',
    enableDarkMode: import.meta.env.VITE_ENABLE_DARK_MODE !== 'false', // 默认开启
    
    // 默认搜索引擎
    defaultSearchEngine: import.meta.env.VITE_DEFAULT_SEARCH_ENGINE || 'bing',
    
    // 页脚信息
    footerText: import.meta.env.VITE_FOOTER_TEXT || '用 ❤️ 制作',
    showFooter: import.meta.env.VITE_SHOW_FOOTER !== 'false', // 默认显示
    
    // 管理员密码(从环境变量读取)
    adminPassword: import.meta.env.VITE_ADMIN_PASSWORD,
    
    // GitHub API 配置
    githubToken: import.meta.env.VITE_GITHUB_TOKEN,
    githubOwner: import.meta.env.VITE_GITHUB_OWNER,
    githubRepo: import.meta.env.VITE_GITHUB_REPO,
    githubBranch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
  }
}

/**
 * 获取页面标题
 * @param {string} pageName - 页面名称
 * @returns {string} 完整的页面标题
 */
export const getPageTitle = (pageName) => {
  const config = getSiteConfig()
  
  const titleMap = {
    'home': config.homeTitle,
    'admin': config.adminTitle,
    'test': `环境变量测试 - ${config.siteName}`,
  }
  
  return titleMap[pageName] || config.siteTitle
}

/**
 * 检查配置是否完整
 * @returns {Object} 配置检查结果
 */
export const checkConfig = () => {
  const config = getSiteConfig()
  
  return {
    hasAdminPassword: !!config.adminPassword,
    hasGithubToken: !!config.githubToken,
    hasGithubOwner: !!config.githubOwner,
    hasGithubRepo: !!config.githubRepo,
    isLockEnabled: config.enableLock,
    config: config
  }
}

// 导出默认配置
export default getSiteConfig()
