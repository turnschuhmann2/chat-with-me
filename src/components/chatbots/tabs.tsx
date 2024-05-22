import {
  DiamondsFour,
  Globe,
  PaintBrushHousehold,
  Planet,
  Users,
} from "@phosphor-icons/react/dist/ssr";

export const chatbotRoutes = {
  all: "all",
  myCreations: "my-creations",
  fromFriends: "from-friends",
  public: "public",
  // explore: "explore",
};

export const chatbotTabs = {
  [chatbotRoutes.all]: {
    label: "All Chatbots",
    icon: <DiamondsFour />,
  },
  [chatbotRoutes.myCreations]: {
    label: "My Creations",
    icon: <PaintBrushHousehold />,
  },
  [chatbotRoutes.fromFriends]: {
    label: "From Friends",
    icon: <Users />,
  },
  [chatbotRoutes.public]: {
    label: "Public",
    icon: <Globe />,
  },
};
