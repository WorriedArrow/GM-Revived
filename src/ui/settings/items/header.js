export default () => {
const { React } = goosemod.webpackModules.common;

const { FormTitle, Tooltip } = goosemod.webpackModules.common.CommonComponents;

const Margins = goosemod.webpackModules.findByProps('marginTop20', 'marginBottom8');

const Science = goosemod.webpackModules.findByDisplayName('Science');


return class Header extends React.PureComponent {
  constructor(props) {
    if (props.experimental) {
      props.text = [
        React.createElement(Tooltip, {
          position: 'top',
          color: 'primary',

          text: 'Experimental',
        }, ({
          onMouseLeave,
          onMouseEnter
        }) =>
          React.createElement(Science, {
            width: 18,
            height: 18,

            className: 'gm-settings-label-icon',

            onMouseLeave,
            onMouseEnter
          })
        ),

        React.createElement('span', {
          style: {
            verticalAlign: 'unset'
          },

          className: 'gm-settings-label-text'
        }, props.text)
      ];
    }

    props.id = `gm-settings-header-${Math.random().toString().substring(2)}`;
    props.collapsible = props.collapsed !== undefined;
    props.collapsed = props.collapsed || false;

    if (props.hide) props.collapseOffset = 0;


    super(props);

    this.props.handleCollapse = () => {
      const after = [...document.querySelectorAll(`#${this.props.id} ~ *`)];

      const headerChildren = after.slice(0, after.indexOf(after.find((x) => x.tagName === 'H5')));

      for (const child of headerChildren.slice(this.props.collapseOffset || 0)) {
        child.style.display = this.props.collapsed ? 'none' : '';
      }
    };

    if (this.props.collapsed) this.props.handleCollapse();
  }

  render() {
    setTimeout(this.props.handleCollapse, 100);

    return this.props.hide ? null : React.createElement(FormTitle, {
      tag: 'h5',

      className: (this.props.i !== 0 ? Margins.marginTop20 + ' ' : '') + Margins.marginBottom8,

      onClick: this.props.collapsible ? () => {
        this.props.collapsed = !this.props.collapsed;
        this.props.handleCollapse();

        this.forceUpdate();
      } : undefined,

      id: this.props.id
    },
      this.props.text,

      this.props.collapsible ? React.createElement(goosemod.webpackModules.findByDisplayName('DropdownArrow'), {
        className: [`gm-settings-header-collapser`, this.props.collapsed ? 'collapsed' : ''].join(' '),

        width: 22,
        height: 22
      }) : null
    );
  }
}
};