// import React from "react";
// import { observable } from "mobx";
// import { observer } from "mobx-react";
// import { HeroNavigationContextProvider } from "../../../context/HeroNavigationContext";
// interface IOwnProps {
//   image?;
//   heading;
//   headingSize;
//   lead_text;
//   navigation_list_items?;
//   back_button_text;
//   call_to_action_button_text;
// }
// @observer
// class HeroNavigation extends React.Component<IOwnProps> {
//   onFirstStateButtonClick = () => {
//     this.firstStateActive = !this.firstStateActive;
//     this.secondStateButtonClick = false;
//     this.subCategorySelected = -1;
//   };
//   onSecondStateButtonClick = () => {
//     this.secondStateButtonClick = !this.secondStateButtonClick;
//     this.subCategorySelected = -1;
//   };
//   onSubCategoryClick = event => {
//     let categoryIndex = event.target.getAttribute("data-herocategoryindex");
//     this.subCategorySelected = categoryIndex;
//   };
//   // This should not be here
//   @observable firstStateActive = false;
//   @observable secondStateButtonClick = false;
//   @observable subCategorySelected = -1;

//   public render() {
//     let navStateClass = "if content navigation";
//     let activeStep1 = this.firstStateActive == true ? " is-active step-1" : "";
//     let activeStep2 = this.subCategorySelected != -1 ? " step-2" : "";
//     const heroImageStyle = {
//       backgroundImage: "url(" + this.props.image + ")",
//       backgroundSize: "cover",
//       backgroundPosition: "center top 2vh"
//     };

//     return (
//       <section id="demo-hero-navigation" className="if hero reverse">
//         {/* Removed jsx styling see sass module for reference */}
//         <div className="if container">
//           <div
//             className="if content"
//             style={{ display: this.firstStateActive ? "none" : "block" }}
//           >
//             <h1 className={`if heading ${this.props.headingSize}`}>
//               {this.props.heading}
//             </h1>
//             <span
//               dangerouslySetInnerHTML={{ __html: this.props.lead_text }}
//             ></span>
//             <button
//               type="button"
//               className="if button primary large"
//               onClick={this.onFirstStateButtonClick}>
//               {this.props.call_to_action_button_text}
//             </button>
//           </div>
//           <nav className={navStateClass + activeStep1 + activeStep2}>
//             <button
//               type="button"
//               className="if navigation back"
//               onClick={this.onFirstStateButtonClick}
//             >
//               {this.props.back_button_text}
//             </button>
//             <button
//               type="button"
//               className={"if navigation back step-2"}
//               onClick={this.onSecondStateButtonClick}
//             >
//               {this.props.back_button_text}
//             </button>
//             <div className="if navigation-container">
//               <ul className="if navigation-list">
//                 <HeroNavigationContextProvider
//                   value={{
//                     subCategoryClick: this.onSubCategoryClick,
//                     activeCategory: this.subCategorySelected
//                   }}
//                 >
//                   {this.props.navigation_list_items}
//                 </HeroNavigationContextProvider>
//               </ul>
//             </div>
//           </nav>
//           <div className="if transform blur">
//             <div className="if image studio" style={heroImageStyle}></div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }
// export default HeroNavigation;
