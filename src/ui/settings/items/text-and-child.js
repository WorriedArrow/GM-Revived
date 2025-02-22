import _Divider from './divider';

export default () => {
const { React } = goosemod.webpackModules.common;

const Divider = _Divider();

const Button = goosemod.webpackModules.findByProps('Sizes', 'Colors', 'Looks', 'DropdownSizes');

const Markdown = goosemod.webpackModules.find((x) => x.displayName === 'Markdown' && x.rules);

const { FormItem, FormText } = goosemod.webpackModules.common.CommonComponents;

const Flex = goosemod.webpackModules.findByDisplayName('Flex');
const Margins = goosemod.webpackModules.findByProps('marginTop20', 'marginBottom20');

const FormClasses = goosemod.webpackModules.findByProps('title', 'dividerDefault');
const FormTextClasses = goosemod.webpackModules.findByProps('formText', 'placeholder');

return class TextAndButton extends React.PureComponent {
  render() {
    return React.createElement(FormItem, {
        className: [Flex.Direction.VERTICAL, Flex.Justify.START, Flex.Align.STRETCH, Flex.Wrap.NO_WRAP, Margins.marginBottom20].join(' '),
      },

      React.createElement('div', {
          style: {
            display: 'flex',
            justifyContent: 'space-between'
          }
        },

        React.createElement('div', {},
          React.createElement('div', {
              className: FormClasses.labelRow,
              style: {
                marginBottom: '4px'
              }
            },

            React.createElement('label', {
              class: FormClasses.title
            }, this.props.text)
          ),

          React.createElement(FormText, {
            className: FormTextClasses.description
          },
            React.createElement(Markdown, {
              className: 'gm-settings-note-markdown'
            }, this.props.subtext || '')
          )
        ),

        this.props.children
      ),

      React.createElement(Divider)
    );
  }
}
};