import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import styled from "@emotion/styled"
import { css } from "@emotion/core"
import Color from "../constants/color"
import profilepic from "../images/profile-pic.jpg"
import TagsList from "./TagsList"
import CenteredLayout from "./CenteredLayout"

const ProfileImage = styled.img`
  border-radius: 50%;
  width: 64px;
  height: 64px;
  margin: 0px 0px 10px 0px;
`

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
`

const Header = ({ siteTitle }) => (
  <header
    style={{
      marginBottom: `1.45rem`,
    }}
  >
    <CenteredLayout>
      <div
        style={{
          display: "flex",
          margin: `0 auto`,
          alignItems: "center",
          paddingTop: "1.1rem",
        }}
      >
        <h1 style={{ margin: 0, flex: 1 }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <ProfileImageContainer>
          <ProfileImage src={profilepic} alt="Profile Picture" />
          <h5>Jawad Rehman</h5>
        </ProfileImageContainer>
      </div>
      {/* <TagsList /> */}
    </CenteredLayout>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
