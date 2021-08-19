import ContactUsForm from "components/Domain/Forms/ContactForm";
import React, { Component } from "react";
import SimpleModal from "../Modal/SimpleModal";

interface ContactProps {
  buttonText: any;
}

export default class Contact extends Component<ContactProps> {
  state = { showContactModal: false };
  submittedOrCanceled = () => this.setState({ showContactModal: false });

  render() {
    const { showContactModal } = this.state;

    const modalData = {
      title: "Get in touch",
      content: (
        <ContactUsForm
          cancel={this.submittedOrCanceled}
          formSubmitted={this.submittedOrCanceled}
        />
      ),
      onClose: () => this.setState({ showContactModal: false }),
    };

    return (
      <>
        <button
          onClick={() => this.setState({ showContactModal: true })}
          className="if button primary large"
        >
          {this.props.buttonText}
        </button>
        {showContactModal && <SimpleModal {...modalData} />}
      </>
    );
  }
}
