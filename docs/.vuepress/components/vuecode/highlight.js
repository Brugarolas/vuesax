import HLJS from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import MarkdownIt from 'markdown-it'

const RE = /{([\d,-]+)}/
const WRAPPER_RE = /^<pre .*?><code>/

const highlightLines = (markdown) => {
  const originalFence = markdown.renderer.rules.fence

  markdown.renderer.rules.fence = (...args) => {
    const [tokens, idx, options] = args
    const token = tokens[idx]

    if (!token.info || !RE.test(token.info)) {
      return originalFence(...args)
    }

    const langName = token.info.replace(RE, '').trim()
    const lineNumbers = RE.exec(token.info)[1]
      .split(',')
      .map(v => v.split('-').map(v => parseInt(v, 10)))

    const code = options.highlight
      ? options.highlight(token.content, langName)
      : token.content

    const rawCode = code.replace(WRAPPER_RE, '')
    const leadingWrapper = code.match(WRAPPER_RE)[0]

    const codeSplits = rawCode.split('\n').map((split, index) => {
      const lineNumber = index + 1
      const inRange = lineNumbers.some(([start, end]) => {
        if (start && end) {
          return lineNumber >= start && lineNumber <= end
        }
        return lineNumber === start
      })

      if (inRange) {
        return {
          code: `<span class="highlighted-line">${split}</span>`,
          highlighted: true
        }
      }

      return {
        code: split
      }
    })

    let highlightedCode = leadingWrapper
    codeSplits.forEach(split => {
      if (split.highlighted) {
        highlightedCode += split.code
      } else {
        highlightedCode += `${split.code}\n`
      }
    })
    return highlightedCode
  }
}

const MD = MarkdownIt({
  highlight: function (str, lang) {
    if (lang && HLJS.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><span data-code="${HLJS.highlight(lang, str, true)}" class="flaticon-copy-content icon-copyx"></span><span class="tagx">${lang}</span><code>${HLJS.highlight(lang, str, true).value}</code></pre>`;
      } catch (error) {
        console.log('Markdown error', error)
      }
    }

    return `<pre class="hljs"><span data-code="${HLJS.highlight(lang, str, true)}" class="flaticon-copy-content icon-copyx"></span><span class="tagx">${lang}</span><code>${MD.utils.escapeHtml(str)}</code></pre>`;
  }
}).use(highlightLines);

export default MD
