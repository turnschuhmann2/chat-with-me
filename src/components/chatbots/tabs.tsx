import {
  DiamondsFour,
  Globe,
  PaintBrushHousehold,
  Planet,
  Users,
} from "@phosphor-icons/react/dist/ssr";

export type ChatbotTab = {
  label: string;
  icon: JSX.Element;
  route: string;
};

export const chatbotRoutes = {
  all: "/all",
  myCreations: "/my-creations",
  fromFriends: "/from-friends",
  public: "/public",
  explore: "/explore",
};

export const chatbotRouteLabels = {
  [chatbotRoutes.all]: "All Chatbots",
  [chatbotRoutes.myCreations]: "My Creations",
  [chatbotRoutes.fromFriends]: "From Friends",
  [chatbotRoutes.public]: "Public",
  [chatbotRoutes.explore]: "Explore",
};

export const chatbotRouteIcons = {
  [chatbotRoutes.all]: <DiamondsFour />,
  [chatbotRoutes.myCreations]: <PaintBrushHousehold />,
  [chatbotRoutes.fromFriends]: <Users />,
  [chatbotRoutes.public]: <Globe />,
  [chatbotRoutes.explore]: <Planet />,
};

// TODO replace this objects values with the actual filters
export const chatbotRouteFilters = {
  [chatbotRoutes.all]: {},
  [chatbotRoutes.myCreations]: { creator: "me" },
  [chatbotRoutes.fromFriends]: { creator: "friends" },
  [chatbotRoutes.public]: { public: true },
  [chatbotRoutes.explore]: { explore: true },
};
