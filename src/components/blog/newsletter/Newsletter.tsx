"use client";
import * as S from "./styles";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError("Please enter your email address");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    setError("");
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would call your newsletter API here
      // await subscribeToNewsletter(email);
      
      setIsSuccess(true);
      setEmail("");
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <S.Container>
      <S.Content>
        <S.Icon>✉️</S.Icon>
        <S.TextContent>
          <S.Title>Never Miss an Update</S.Title>
          <S.Description>
            Subscribe to our newsletter and get the latest web development insights, 
            tutorials, and best practices delivered directly to your inbox.
          </S.Description>
        </S.TextContent>
        
        <S.Form onSubmit={handleSubmit}>
          <S.InputWrapper>
            <S.EmailIcon>📧</S.EmailIcon>
            <S.Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address for newsletter"
              disabled={isSubmitting || isSuccess}
              required
            />
            <S.SubmitButton 
              type="submit" 
              disabled={isSubmitting || isSuccess}
              aria-label="Subscribe to newsletter"
            >
              {isSubmitting ? (
                <S.LoadingSpinner />
              ) : isSuccess ? (
                "Subscribed! ✅"
              ) : (
                "Subscribe Now"
              )}
            </S.SubmitButton>
          </S.InputWrapper>
          
          {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
          
          {isSuccess && (
            <S.SuccessMessage>
              🎉 Thank you for subscribing! Check your inbox for confirmation.
            </S.SuccessMessage>
          )}
        </S.Form>
        
        <S.PrivacyNote>
          By subscribing, you agree to our{" "}
          <S.PrivacyLink href="/privacy">Privacy Policy</S.PrivacyLink>. 
          No spam, unsubscribe at any time.
        </S.PrivacyNote>
        
        <S.Stats>
          <S.Stat>
            <S.StatNumber>10,000+</S.StatNumber>
            <S.StatLabel>Subscribers</S.StatLabel>
          </S.Stat>
          <S.StatDivider />
          <S.Stat>
            <S.StatNumber>Weekly</S.StatNumber>
            <S.StatLabel>Updates</S.StatLabel>
          </S.Stat>
          <S.StatDivider />
          <S.Stat>
            <S.StatNumber>0%</S.StatNumber>
            <S.StatLabel>Spam</S.StatLabel>
          </S.Stat>
        </S.Stats>
      </S.Content>
    </S.Container>
  );
}