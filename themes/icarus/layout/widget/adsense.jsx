/**
 * Google AdSense widget JSX component.
 * @module view/widget/adsense
 */
const { Component } = require('inferno');
const { cacheComponent } = require('hexo-component-inferno/lib/util/cache');

/**
 * Google AdSense widget JSX component.
 *
 * @see https://www.google.com/adsense/new/
 * @example
 * <AdSense
 *     title="Widget title"
 *     clientId="******"
 *     slotId="******" />
 */
class AdSense extends Component {
    render() {
        const { title, clientId, slotId } = this.props;
        if (!clientId || !slotId) {
            return <div class="card widget">
                <div class="card-content">
                    <div class="notification is-danger">
                        You need to set <code>client_id</code> and <code>slot_id</code> to show this AD unit.
                        Please set it in <code>_config.yml</code>.
                    </div>
                </div>
            </div>;
        }
        return <div class="card widget">
            <div class="card-content">
                <div class="menu">
                    <h3 class="menu-label">{title}</h3>
                    <ul class="menu-list">
                        <center>
                            <a href="https://www.creativewriting.cn/%E5%88%9B%E6%84%8F%E5%86%99%E4%BD%9C/%E5%86%99%E4%BD%9C%E6%8A%80%E5%B7%A7/%E6%92%B0%E5%86%99%E7%AC%AC%E4%B8%80%E6%9C%AC%E5%B0%8F%E8%AF%B4/" target="_blank"><img src="https://www.creativewriting.cn/images/book2.png" /></a>
                        </center>
                    </ul>
                </div>
            </div>
        </div>;
    }
}

/**
 * Cacheable Google AdSense widget JSX component.
 * <p>
 * This class is supposed to be used in combination with the <code>locals</code> hexo filter
 * ({@link module:hexo/filter/locals}).
 *
 * @see module:util/cache.cacheComponent
 * @example
 * <AdSense.Cacheable
 *     widget={{ client_id: '******', slot_id: '******' }}
 *     helper={{ __: function() {...} }} />
 */
AdSense.Cacheable = cacheComponent(AdSense, 'widget.adsense', props => {
    const { widget, helper } = props;
    const { client_id, slot_id } = widget;

    return {
        title: helper.__('widget.adsense'),
        clientId: client_id,
        slotId: slot_id
    };
});

module.exports = AdSense;
