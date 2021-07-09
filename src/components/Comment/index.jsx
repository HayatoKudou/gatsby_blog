/* eslint-disable func-names */
/* Vendor imports */
import React from 'react';
import PropTypes from 'prop-types';
/* App imports */
import Config from '../../../config';

class Comments extends React.Component {
  componentDidMount() {
    // const { pageCanonicalUrl, pageId } = this.props;

    // if (window.DISQUS) {
    //   window.DISQUS.reset({
    //     reload: true,
    //     config() {
    //       this.page.url = pageCanonicalUrl;
    //       this.page.identifier = pageId;
    //     },
    //   });
    // } else {
    //   window.disqus_config = () => {
    //     this.page.url = pageCanonicalUrl;
    //     this.page.identifier = pageId;
    //   };
    //   (function () {
    //     // eslint-disable-next-line no-undef
    //     const d = document;
    //     const s = d.createElement('script');
    //     s.src = Config.disqusScript;
    //     s.setAttribute('data-timestamp', +new Date());
    //     (d.head || d.body).appendChild(s);
    //   }());
    // }
    // this.remeveAds();
  }

  remeveAds()
  {
    // const disqus = document.getElementById('disqus_thread');
    // let remove_ads = setInterval(() => {
    //   const iframes = document.getElementsByTagName('iframe');
    //   for (var iframe in iframes) {
    //       if (typeof iframes[iframe].src === 'undefined') {
    //         continue;
    //       }
    //       // iframes[iframe].remove();
    //       if (iframes[iframe].src.match(/(ads-iframe)|(disqusads)|(disqus)/gi)) {
    //         iframes[iframe].remove();
    //       //   // disqus.style.width = '100%';
    //       }
    //   }
      
    // }, 500);
    // setTimeout(() => {
    //   clearInterval(remove_ads);
    // }, 5000);
  }

  render() {
    return (
      <div>
        {/* <div id="disqus_thread" /> */}
      </div>
    );
  }
}

Comments.propTypes = {
  pageCanonicalUrl: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default Comments;
