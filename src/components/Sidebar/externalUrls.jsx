import { ReactComponent as ForumIcon } from "../../assets/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../assets/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../assets/icons/docs.svg";
import { ReactComponent as FeedbackIcon } from "../../assets/icons/feedback.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  {
    title: <Trans>Governance</Trans>,
    url: "https://vote.radao.finance/",
    icon: <SvgIcon color="primary" component={GovIcon} />,
  },
  {
    title: <Trans>Docs</Trans>,
    url: "https://docs.radao.finance/",
    icon: <SvgIcon color="primary" viewBox="0 0 31 35" component={DocsIcon} />,
  },
  // {
  //   title: <Trans>Referral</Trans>,
  //   url: "https://forum.olympusdao.finance/",
  //   icon: <SvgIcon color="primary" component={ForumIcon} />,
  // }
];

export default externalUrls;
