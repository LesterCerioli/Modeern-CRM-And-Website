'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Title,
  FormContainer,
  FormGroup,
  Label,
  Input,
  TextArea,
  UploadContainer,
  UploadButton,
  UploadInput,
  ImagePreview,
  PublishOptionsContainer,
  PublishOptionButton,
  ToggleContainer,
  ToggleLabel,
  ToggleSwitch,
  DateTimeSection,
  DateTimeRow,
  TimeContainer,
  ButtonContainer,
  ActionButton,
  Footer,
  ToastContainer,
  ToastIcon,
  ToastMessage,
  ToastCloseButton,
  PeriodButton,
} from './styles';

interface CreatePostData {
  postTitle: string;
  postText: string;
  image: File | null;
  publishOption: 'now' | 'schedule';
  publishNowToggle: boolean;
  scheduleMonth: string;
  scheduleYear: string;
  scheduleHour: string;
  scheduleMinute: string;
  schedulePeriod: 'AM' | 'PM';
}

interface ToastData {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'info';
}

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState<CreatePostData>({
    postTitle: '',
    postText: '',
    image: null,
    publishOption: 'now',
    publishNowToggle: true,
    scheduleMonth: '',
    scheduleYear: '',
    scheduleHour: '',
    scheduleMinute: '',
    schedulePeriod: 'AM',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
  const [toast, setToast] = useState<ToastData>({
    show: false,
    message: '',
    type: 'success',
  });

  
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ show: true, message, type });
  };

  
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    
    if (['scheduleMonth', 'scheduleYear', 'scheduleHour', 'scheduleMinute'].includes(name)) {
      if (value === '' || /^\d+$/.test(value)) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        showToast('Only JPEG or PNG files are allowed', 'error');
        e.target.value = '';
        return;
      }

      setFormData(prev => ({ ...prev, image: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePublishOptionChange = (option: 'now' | 'schedule') => {
    setFormData(prev => ({ 
      ...prev, 
      publishOption: option,
      publishNowToggle: option === 'now' 
    }));
  };

  const handleToggleChange = () => {
    const newToggleState = !formData.publishNowToggle;
    setFormData(prev => ({ 
      ...prev, 
      publishNowToggle: newToggleState,
      publishOption: newToggleState ? 'now' : 'schedule'
    }));
  };

  const handlePeriodChange = (period: 'AM' | 'PM') => {
    setFormData(prev => ({ ...prev, schedulePeriod: period }));
  };

  const handleSubmit = (e: React.FormEvent, action: 'draft' | 'publish') => {
    e.preventDefault();
    
    
    if (!formData.postTitle.trim()) {
      showToast('Please enter post title', 'error');
      return;
    }

    if (!formData.postText.trim()) {
      showToast('Please enter post text', 'error');
      return;
    }

    if (action === 'publish' && formData.publishOption === 'schedule') {
      if (!formData.scheduleMonth || !formData.scheduleYear) {
        showToast('Please enter schedule date (MM/YYYY)', 'error');
        return;
      }
      if (!formData.scheduleHour || !formData.scheduleMinute) {
        showToast('Please enter schedule time', 'error');
        return;
      }
    }

    
    const postData = {
      ...formData,
      action,
      scheduleDate: formData.publishOption === 'schedule' ? 
        `${formData.scheduleMonth}/${formData.scheduleYear}` : null,
      scheduleTime: formData.publishOption === 'schedule' ? 
        `${formData.scheduleHour}:${formData.scheduleMinute} ${formData.schedulePeriod}` : null,
    };

    console.log('Post Data:', postData);
    
    if (action === 'draft') {
      showToast('Post saved as draft successfully!', 'success');
    } else {
      showToast(
        formData.publishOption === 'now' 
          ? 'Post published now!' 
          : 'Post scheduled successfully!',
        'success'
      );
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.show && (
        <ToastContainer type={toast.type}>
          <ToastIcon type={toast.type} />
          <ToastMessage>{toast.message}</ToastMessage>
          <ToastCloseButton onClick={() => setToast(prev => ({ ...prev, show: false }))}>
            ×
          </ToastCloseButton>
        </ToastContainer>
      )}

      <Container>
        <Title>CREATE NEW POST</Title>
        
        <FormContainer>
          <FormGroup>
            <Label htmlFor="postTitle">POST TITLE</Label>
            <Input
              id="postTitle"
              name="postTitle"
              type="text"
              placeholder="Enter post title..."
              value={formData.postTitle}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="postText">POST TEXT</Label>
            <TextArea
              id="postText"
              name="postText"
              placeholder="Enter post text... Lorem ipsum de unionalte texiáquas tementre our doro can tantes nútan yo disi uniç des Inande."
              rows={6}
              value={formData.postText}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Label>UPLOAD IMAGE (JPEG, PNG)</Label>
            <UploadContainer>
              <UploadButton htmlFor="image-upload">
                CHOOSE FILE
              </UploadButton>
              <UploadInput
                id="image-upload"
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                onChange={handleImageChange}
              />
              <span style={{ marginLeft: '10px', color: '#6b7280', fontSize: '14px' }}>
                {formData.image ? formData.image.name : 'No file chosen'}
              </span>
            </UploadContainer>
            
            {imagePreview && (
              <ImagePreview>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                />
              </ImagePreview>
            )}
          </FormGroup>

          <FormGroup>
            <PublishOptionsContainer>
              <PublishOptionButton
                type="button"
                active={formData.publishOption === 'now'}
                onClick={() => handlePublishOptionChange('now')}
              >
                PUBLISH NOW
              </PublishOptionButton>
              <PublishOptionButton
                type="button"
                active={formData.publishOption === 'schedule'}
                onClick={() => handlePublishOptionChange('schedule')}
              >
                SCHEDULE PUBLISH
              </PublishOptionButton>
            </PublishOptionsContainer>
          </FormGroup>

          {formData.publishOption === 'now' ? (
            <FormGroup>
              <ToggleContainer>
                <ToggleLabel>ON</ToggleLabel>
                <ToggleSwitch active={formData.publishNowToggle} onClick={handleToggleChange}>
                  <div className="toggle-slider">
                    <span className="toggle-on">ON</span>
                    <span className="toggle-off">OFF</span>
                    <div className={`toggle-handle ${formData.publishNowToggle ? 'on' : 'off'}`} />
                  </div>
                </ToggleSwitch>
              </ToggleContainer>
            </FormGroup>
          ) : (
            <FormGroup>
              <DateTimeSection>
                <div style={{ marginBottom: '20px' }}>
                  <Label>SCHEDULE DATE & TIME</Label>
                </div>
                
                <DateTimeRow>
                  <div style={{ flex: 1 }}>
                    <Label htmlFor="scheduleMonth">MM/YYYY</Label>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <Input
                        id="scheduleMonth"
                        name="scheduleMonth"
                        type="text"
                        placeholder="MM"
                        maxLength={2}
                        style={{ width: '70px', textAlign: 'center' }}
                        value={formData.scheduleMonth}
                        onChange={handleInputChange}
                      />
                      <span style={{ color: '#6b7280' }}>/</span>
                      <Input
                        id="scheduleYear"
                        name="scheduleYear"
                        type="text"
                        placeholder="YYYY"
                        maxLength={4}
                        style={{ width: '90px', textAlign: 'center' }}
                        value={formData.scheduleYear}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <Label>HH:MM AM/PM</Label>
                    <TimeContainer>
                      <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                        <Input
                          name="scheduleHour"
                          type="text"
                          placeholder="HH"
                          maxLength={2}
                          style={{ width: '60px', textAlign: 'center' }}
                          value={formData.scheduleHour}
                          onChange={handleInputChange}
                        />
                        <span style={{ color: '#6b7280' }}>:</span>
                        <Input
                          name="scheduleMinute"
                          type="text"
                          placeholder="MM"
                          maxLength={2}
                          style={{ width: '60px', textAlign: 'center' }}
                          value={formData.scheduleMinute}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <PeriodButton
                          type="button"
                          active={formData.schedulePeriod === 'AM'}
                          onClick={() => handlePeriodChange('AM')}
                        >
                          AM
                        </PeriodButton>
                        <PeriodButton
                          type="button"
                          active={formData.schedulePeriod === 'PM'}
                          onClick={() => handlePeriodChange('PM')}
                        >
                          PM
                        </PeriodButton>
                      </div>
                    </TimeContainer>
                  </div>
                </DateTimeRow>
              </DateTimeSection>
            </FormGroup>
          )}

          <ButtonContainer>
            <ActionButton 
              type="button" 
              variant="secondary"
              onClick={(e) => handleSubmit(e, 'draft')}
            >
              SAVE DRAFT
            </ActionButton>
            <ActionButton 
              type="button" 
              variant="primary"
              onClick={(e) => handleSubmit(e, 'publish')}
            >
              PUBLISH
            </ActionButton>
          </ButtonContainer>
        </FormContainer>

        <Footer>
          <div>29:30</div>
          <div>Restado</div>
        </Footer>
      </Container>
    </>
  );
};

export default CreatePost;