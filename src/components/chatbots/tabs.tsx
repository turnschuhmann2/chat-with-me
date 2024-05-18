import {
  DiamondsFour,
  Globe,
  PaintBrushHousehold,
  Planet,
  Users,
} from "@phosphor-icons/react/dist/ssr";

// export type ChatbotTabs = {
//   [x: string]: {
//     label: string;
//     icon: JSX.Element;
//     route: string;
//   }
// };

export const chatbotRoutes = {
  all: "all",
  myCreations: "my-creations",
  fromFriends: "from-friends",
  public: "public",
  explore: "explore",
};

export const chatbotTabs = {
  [chatbotRoutes.all]: {
    label: "All Chatbots",
    icon: <DiamondsFour />,
    filter: {},
  },
  [chatbotRoutes.myCreations]: {
    label: "My Creations",
    icon: <PaintBrushHousehold />,
    filter: {},
  },
  [chatbotRoutes.fromFriends]: {
    label: "From Friends",
    icon: <Users />,
    filter: {},
  },
  [chatbotRoutes.public]: {
    label: "Public",
    icon: <Globe />,
    filter: {},
  },
  [chatbotRoutes.explore]: {
    label: "Explore",
    icon: <Planet />,
    filter: {},
  },
};
