import React, { useState } from 'react';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Flex, Form } from 'antd';
import { Rule } from 'antd/es/form';
import { isArray } from 'lodash';
import { ModalChangePasswordProps } from '../types';
import { InputPassword, Modal } from '@/components/Atoms';
import { REGEX_NUMBER_SPECIAL_CHAR, REGEX_PASSWORD, REGEX_UPPER_LOWER_CASE } from '@/constants/common/const';
import { useAsyncEffect } from '@/hooks';
import { NotificationApi, UserApi } from '@/service/API';
import { notification } from '@/staticAlert';
import { logout } from '@/utilities/auth';

const ModalChangePassword: React.FC<ModalChangePasswordProps> = (props) => {
  const { open, onClose } = props;

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [formRules, setFormRules] = useState<Rule[]>([]);
  const [lengthValidate, setLengthValidate] = useState(false);
  const [upperLowerCaseValidate, setUpperLowerCaseValidate] = useState(false);
  const [numberSpecialCharValidate, setNumberSpecialCharValidate] = useState(false);

  const handleLogout = async () => {
    try {
      await NotificationApi.logoutNoti();
    } catch (_) {
      //
    } finally {
      logout();
    }
  };

  function handleClose() {
    form.resetFields();
    onClose();
  }

  async function handleSubmit() {
    try {
      setLoading(true);
      const res = await UserApi.changePassword(form.getFieldsValue());
      if (res.messageCode === '200') {
        notification.success({
          message: 'Thành công',
          description: 'Thay đổi mật khẩu thành công. Bạn cần đăng nhập lại bằng mật khẩu mới!',
          placement: 'topRight'
        });
        handleClose();
        setTimeout(handleLogout, 1000);
      } else {
        notification.error({
          message: 'Thất bại',
          description: 'Thay đổi mật khẩu thất bại!',
          placement: 'topRight'
        });
        handleClose();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useAsyncEffect(async () => {
    if (!open) return;
    const res = await UserApi.getPasswordRules();
    const passwordRules = res.data;
    const getRulesSuccess = res && passwordRules && isArray(passwordRules) && passwordRules.length > 0;
    if (!getRulesSuccess) return;
    setFormRules(
      passwordRules
        .filter((item) => !!item.filter)
        .map(
          (item) =>
            ({
              message: item.description,
              pattern: item.filter
            }) as Rule
        )
    );
  }, [open]);

  return (
    <Modal
      title='Đổi mật khẩu'
      width='430px'
      loading={loading}
      open={open}
      onOk={() => form.submit()}
      onCancel={handleClose}
    >
      <Form form={form} onFinish={handleSubmit}>
        <Flex gap={8} vertical>
          <InputPassword type='password' name='oldPassword' label='Mật khẩu hiện tại' required />
          <InputPassword
            type='password'
            name='newPassword'
            label='Mật khẩu mới'
            required
            rules={[
              {
                message: 'Mật khẩu không được chứa khoảng trắng!',
                pattern: /^\S+$/
              },
              {
                validator: (_, value) => {
                  if (value && [...value].some((char) => char.charCodeAt(0) > 127)) {
                    return Promise.reject(new Error('Mật khẩu không được chứa ký tự tiếng việt!'));
                  }
                  return Promise.resolve();
                }
              },
              ...formRules,
              {
                message: '',
                pattern: REGEX_PASSWORD
              }
            ]}
            onChange={(value) => {
              value.length >= 6 ? setLengthValidate(true) : setLengthValidate(false);
              REGEX_UPPER_LOWER_CASE.test(value) ? setUpperLowerCaseValidate(true) : setUpperLowerCaseValidate(false);
              REGEX_NUMBER_SPECIAL_CHAR.test(value)
                ? setNumberSpecialCharValidate(true)
                : setNumberSpecialCharValidate(false);
            }}
          />
          <div className='pl-4'>
            <div>
              {lengthValidate ? (
                <>
                  <CheckOutlined style={{ color: 'var(--gt-success-color)' }} /> Ít nhất 6 ký tự
                </>
              ) : (
                <>
                  <CloseOutlined style={{ color: 'var(--gt-error-color)' }} /> Ít nhất 6 ký tự
                </>
              )}
            </div>
            <div>
              {upperLowerCaseValidate ? (
                <>
                  <CheckOutlined style={{ color: 'var(--gt-success-color)' }} /> Bao gồm ký tự hoa và ký tự thường
                </>
              ) : (
                <>
                  <CloseOutlined style={{ color: 'var(--gt-error-color)' }} /> Bao gồm ký tự hoa và ký tự thường
                </>
              )}
            </div>
            <div>
              {numberSpecialCharValidate ? (
                <>
                  <CheckOutlined style={{ color: 'var(--gt-success-color)' }} /> Bao gồm ký tự số và ký tự đặc biệt
                </>
              ) : (
                <>
                  <CloseOutlined style={{ color: 'var(--gt-error-color)' }} /> Bao gồm ký tự số và ký tự đặc biệt
                </>
              )}
            </div>
          </div>
          <InputPassword
            type='password'
            name='newPasswordAgain'
            label='Xác nhận mật khẩu mới'
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không trùng mật khẩu mới!'));
                }
              })
            ]}
            dependencies={['newPassword']}
          />
        </Flex>
      </Form>
    </Modal>
  );
};

export default ModalChangePassword;
