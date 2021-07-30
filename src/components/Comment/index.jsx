/* eslint-disable */
/* eslint-disable func-names */
/* Vendor imports */
import React from 'react';
import PropTypes from 'prop-types';
/* App imports */
import Config from '../../../config';

class Comments extends React.Component {
  componentDidMount() {
    const { pageCanonicalUrl, pageId } = this.props;

    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config() {
          this.page.url = pageCanonicalUrl;
          this.page.identifier = pageId;
        },
      });
    } else {
      window.disqus_config = () => {
        this.page.url = pageCanonicalUrl;
        this.page.identifier = pageId;
      };
      (function () {
        // eslint-disable-next-line no-undef
        const d = document;
        const s = d.createElement('script');
        s.src = Config.disqusScript;
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
      }());
    }
    this.remeveAds();
  }

  remeveAds() {
  //   const disqus = jQuery('#disqus_thread');
  //   disqus.ready(function () {
  //     setTimeout(function () {
  //       if (disqus.children().length >= 3) {
  //         const comments = disqus.find('iframe:nth-child(2)').detach();
  //         disqus.empty().append(comments);
  //       }
  //     }, 2000);
  //   });

  document.addEventListener('DOMContentLoaded', function () {
    let disqus = document.getElementById('disqus_thread');

    let remove_ads = setInterval(() => {
        let iframes = document.getElementsByTagName('iframe');

        for (var iframe in iframes) {
            if (typeof iframes[iframe].src === 'undefined') {
                continue;
            }

            if (iframes[iframe].src.match(/(ads-iframe)|(disqusads)/gi)) {
                iframes[iframe].style.display = 'none';
                disqus.style.width = '100%';
            }
        }
    }, 500);

    setTimeout(function () {
        clearInterval(remove_ads);
    }, 5000);
});
  }

  render() {
    return (
      <div>
        <div id="disqus_thread" />
      </div>
    );
  }
}

Comments.propTypes = {
  pageCanonicalUrl: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

export default Comments;
