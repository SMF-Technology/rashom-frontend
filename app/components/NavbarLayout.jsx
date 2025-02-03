"use client";
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaBars } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gql, request } from "graphql-request";
import { Loader } from "./Loader";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// GraphQL query to fetch categories and subcategories with slugs
const document = gql`
  {
    categories(first: 100) {
      edges {
        node {
          slug
          name
          parent {
            slug
          }
        }
      }
    }
  }
`;

// Function to transform API data into navListMenuItems structure
const transformDataToMenuItems = (data) => {
  const menuItems = {};

  // Helper function to recursively find subcategories
  const findSubcategories = (parentSlug) => {
    return data
      .filter((edge) => edge.node.parent?.slug === parentSlug)
      .map((edge) => edge.node.slug);
  };

  data?.forEach((edge) => {
    const category = edge.node;
    const parentSlug = category.parent?.slug || "uncategorized";

    if (!menuItems[parentSlug]) {
      menuItems[parentSlug] = [];
    }

    // Add the category to its parent's menu items
    menuItems[parentSlug].push({
      id: category.slug,
      title: category.name,
      description: findSubcategories(category.slug), // Add subcategories here
    });
  });

  return menuItems;
};

function MenuSection({ label, menuItems }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderItems = menuItems.map(({ id, title, description }) => (
    <MenuItem key={id} className="flex gap-3 border-0">
      <div>
        <Typography variant="h6" color="blue-gray" className="text-sm text-black font-bold">
          <Link href={`/nav-product/${id}`} passHref>
            {title}
          </Link>
        </Typography>
        <div>
          {description.map((item, index) => (
            <Typography key={index} variant="paragraph" className="text-xs capitalize !font-medium text-blue-gray-500 text-black">
              <ul>
                <Link href={`/nav-product/${item}`} passHref>
                  <li className="list-disc space-y-3 mt-2 ml-4">{item}</li>
                </Link>
              </ul>
            </Typography>
          ))}
        </div>
      </div>
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <Link href={`/nav-product/${label}`} passHref>
              <ListItem
                className="flex items-center gap-2 py-2 pr-4 hover:underline font-medium text-gray-900"
                selected={isMenuOpen || isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen((cur) => !cur)}
              >
                {label}
              </ListItem>
            </Link>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  const [data, setData] = useState(null);
  const [navListMenuItems, setNavListMenuItems] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request(
          API_URL,
          document
        );
        console.log("API response:", response); // Log the entire response to see the data structure
        setData(response?.categories?.edges || []); // Set categories data

        // Transform the data into navListMenuItems structure
        const transformedData = transformDataToMenuItems(response?.categories?.edges);
        setNavListMenuItems(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const categoriesWithNullParent = data?.filter((edge) => edge.node.parent === null).map((edge) => edge.node.slug);

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1 text-black uppercase">
      {categoriesWithNullParent?.map((categorySlug) => (
        <MenuSection key={categorySlug} label={categorySlug} menuItems={navListMenuItems[categorySlug] || []} />
      ))}
    </List>
  );
}

export default function MegaMenuWithHover() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  return (
    <div>
      <Navbar className="mx-auto max-w-screen-xl shadow-none px-4 py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
          <div className="hidden lg:block">
            <NavList />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? <HiXMark className="h-6 w-6 text-black" strokeWidth={2} /> : <FaBars className="h-6 w-6 text-black" strokeWidth={2} />}
          </IconButton>
        </div>
      </Navbar>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </div>
  );
}