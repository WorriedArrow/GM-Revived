export default () => {
const { React } = goosemod.webpackModules.common;

// const Header = goosemod.webpackModules.findByDisplayName('Header');

const { FormTitle } = goosemod.webpackModules.common.CommonComponents;

const Button = goosemod.webpackModules.findByProps('Sizes', 'Colors', 'Looks', 'DropdownSizes');

const Markdown = goosemod.webpackModules.find((x) => x.displayName === 'Markdown' && x.rules);

const DropdownArrow = goosemod.webpackModules.findByDisplayName('DropdownArrow');

return class GMErrorBoundary extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  componentDidCatch(error, moreInfo) {
    console.log('honk', {error, moreInfo});

    const errorStack = decodeURI(error.stack.split('\n').filter((x) => !x.includes('/assets/')).join('\n'));
    const componentStack = decodeURI(moreInfo.componentStack.split('\n').slice(1, 9).join('\n'));

    const suspectedPlugin = errorStack.match(/\((.*) \| GM Module:/)?.[1] || componentStack.match(/\((.*) \| GM Module:/)?.[1];
    let suspectedName = suspectedPlugin || 'Unknown';
    const suspectedType = suspectedPlugin ? 'Plugin' : 'Cause';

    if (suspectedName === 'Unknown') {
      if (errorStack.includes('GooseMod')) {
        suspectedName = 'GooseMod Internals';
      }

      if (errorStack.toLowerCase().includes('powercord') || errorStack.toLowerCase().includes('betterdiscord')) {
        suspectedName = 'Other Mods';
      }
    }

    this.setState({
      error: true,

      suspectedCause: {
        name: suspectedName,
        type: suspectedType
      },

      errorStack: {
        raw: error.stack,
        useful: errorStack
      },

      componentStack: {
        raw: moreInfo.componentStack,
        useful: componentStack
      }
    });
  }

  render() {
    if (this.state.toRetry) {
      this.state.error = false;
    }

    setTimeout(() => {
      this.state.toRetry = true;
    }, 100);

    return this.state.error ? React.createElement('div', {
      className: 'gm-error-boundary'
    },
      React.createElement('div', {},
        React.createElement('div', {}),
  
        React.createElement(FormTitle, {
          tag: 'h1'
        },  'GooseMod has handled an error',
          React.createElement(Markdown, {}, `## Suspected ${this.state.suspectedCause.type}: ${this.state.suspectedCause.name}`)
        )
      ),
  
      React.createElement('div', {},
        React.createElement(Button, {
          color: Button.Colors.BRAND,
          size: Button.Sizes.LARGE,
  
          onClick: () => {
            this.state.toRetry = true;
            this.forceUpdate();
          }
        }, 'Retry'),

        React.createElement(Button, {
          color: Button.Colors.RED,
          size: Button.Sizes.LARGE,
  
          onClick: () => {
            location.reload();
          }
        }, 'Refresh')
      ),

      React.createElement('div', {
        onClick: () => {
          this.state.toRetry = false;
          this.state.showDetails = !this.state.showDetails;
          this.forceUpdate();
        }
      },
        React.createElement('div', {
          style: {
            transform: `rotate(${this.state.showDetails ? '0' : '-90'}deg)`
          },
        },
          React.createElement(DropdownArrow, {
            width: 24,
            height: 24
          })
        ),

        this.state.showDetails ? 'Hide Details' : 'Show Details'
      ),

      this.state.showDetails ? React.createElement('div', {},
        React.createElement(Markdown, {}, `# Error Stack`),
        React.createElement(Markdown, {}, `\`\`\`
${this.state.errorStack.useful}
\`\`\``),
        React.createElement(Markdown, {}, `# Component Stack`),
        React.createElement(Markdown, {}, `\`\`\`
${this.state.componentStack.useful}
\`\`\``),
        React.createElement(Markdown, {}, `# Debug Info`),
        React.createElement(Markdown, {}, `\`\`\`
${goosemod.genDebugInfo()}
\`\`\``)
      ) : null
    ) : this.props.children;
  }
}
};